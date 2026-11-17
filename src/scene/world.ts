import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass.js';
import { sceneState, stationIndex } from '../lib/scene-state';
import { createGovernor } from './governor';
import { backdropFragment, backdropVertex, compositeFragment, fullscreenVertex, shellFragment, shellVertex, trailFragment } from './shaders';

export interface World {
  resize(width: number, height: number, pixelRatio: number): void;
  frame(delta: number): void;
  dispose(): void;
}

const AMBER = '#ffc368';
const AMBER_DEEP = '#ffab3d';
const AMBER_EMIT = '#ffa63a';
const FAIL = '#ff4f33';
const GRAPHITE = '#171515';
const INK = '#f8f2e9';
const CORE_REST = 1.8;
const SURFACE = 0;
const XRAY = 1;

const S = {
  hero: stationIndex('hero'), layers: stationIndex('layers'), testpulse: stationIndex('testpulse'), caldiy: stationIndex('caldiy'),
  llm: stationIndex('llm'), archive: stationIndex('archive'), career: stationIndex('career'), method: stationIndex('method'),
  closing: stationIndex('closing'),
};
const SLABS = 22;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => { const c = clamp01(t); return c * c * (3 - 2 * c); };
const ramp = (v: number, from: number, to: number) => smooth((v - from) / (to - from));
const damp = (current: number, target: number, rate: number, delta: number) => lerp(current, target, 1 - Math.exp(-rate * delta));
const hash = (n: number) => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };

function roundedRect(width: number, height: number, radius: number) {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  return shape;
}

function triangle(scale: number) {
  const shape = new THREE.Shape();
  shape.moveTo(-0.6 * scale, 0.82 * scale);
  shape.lineTo(-0.6 * scale, -0.82 * scale);
  shape.lineTo(0.82 * scale, 0);
  shape.closePath();
  return shape;
}

// Sparse internal lines for the X-ray view of a flat layer.
function gridLines(width: number, depth: number, columns: number, rows: number, y: number) {
  const points: number[] = [];
  for (let i = 1; i < columns; i += 1) {
    const x = -width / 2 + (width * i) / columns;
    points.push(x, y, -depth / 2, x, y, depth / 2);
  }
  for (let i = 1; i < rows; i += 1) {
    const z = -depth / 2 + (depth * i) / rows;
    points.push(-width / 2, y, z, width / 2, y, z);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
  return geometry;
}

function buildEnvironment(renderer: THREE.WebGLRenderer) {
  const studio = new THREE.Scene();
  studio.background = new THREE.Color('#080706');
  const panel = (color: string, intensity: number, width: number, height: number, position: [number, number, number]) => {
    const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity), side: THREE.DoubleSide, toneMapped: false });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), material);
    mesh.position.set(...position);
    mesh.lookAt(0, 0, 0);
    studio.add(mesh);
  };
  panel('#fff3df', 10, 9, 3, [0, 8, 2]);
  panel('#ffb04a', 16, 2.2, 8, [-9, 1, 3]);
  panel('#ffe7c4', 7, 1.6, 7, [9, 2, -2]);
  panel('#ff8a1e', 6, 7, 1.2, [0, -7, 4]);
  panel('#ffffff', 3.5, 3, 3, [4, 3, 9]);
  panel('#ffcf8f', 5, 12, 0.5, [0, 2.5, -10]);
  panel('#fff3df', 12, 0.35, 9, [5, 0, 7]);
  panel('#ffb04a', 9, 0.3, 9, [-5, -1, 7]);
  panel('#ffe7c4', 8, 10, 0.3, [0, 5, 7]);
  const generator = new THREE.PMREMGenerator(renderer);
  const target = generator.fromScene(studio, 0.035);
  generator.dispose();
  studio.traverse(object => {
    if (object instanceof THREE.Mesh) { object.geometry.dispose(); (object.material as THREE.Material).dispose(); }
  });
  return target;
}

export function createWorld(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera, lite: boolean): World {
  const root = new THREE.Group();
  scene.add(root);
  scene.background = null;
  renderer.setClearColor(0x000000, 1);

  const environment = buildEnvironment(renderer);
  scene.environment = environment.texture;

  const key = new THREE.DirectionalLight('#fff1dc', 1.6);
  key.position.set(4, 6, 7);
  const kick = new THREE.PointLight('#ff9a2a', 30, 14, 2);
  kick.position.set(-3.5, -1.5, 3.5);
  root.add(key, kick);

  // Materials. One chrome, one glass recipe, and unlit X-ray companions.
  const chrome = new THREE.MeshStandardMaterial({ color: '#2c2723', metalness: 1, roughness: 0.2, envMapIntensity: 1.9 });
  const glassMaterials: THREE.MeshPhysicalMaterial[] = [];
  const amberDeep = new THREE.Color(AMBER_DEEP);
  const amberEmit = new THREE.Color(AMBER_EMIT);
  const failColor = new THREE.Color(FAIL);
  const makeGlass = () => {
    const material = new THREE.MeshPhysicalMaterial({
      metalness: 0, roughness: 0.16, transmission: 1, thickness: 0.45, ior: 1.38,
      attenuationColor: amberDeep.clone(), attenuationDistance: 1.5, emissive: amberEmit.clone(), emissiveIntensity: 0.08,
      envMapIntensity: 0.75, specularIntensity: 0.8,
    });
    glassMaterials.push(material);
    return material;
  };
  // Each glass body is lit from within by a thin opaque sheet, seen through the glass.
  const falloff = (() => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 128;
    const context = canvas.getContext('2d');
    if (context) {
      const gradient = context.createRadialGradient(64, 64, 4, 64, 64, 90);
      gradient.addColorStop(0, 'rgb(255 255 255)');
      gradient.addColorStop(0.55, 'rgb(150 150 150)');
      gradient.addColorStop(1, 'rgb(46 46 46)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, 128, 128);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  })();
  const coreMaterials: THREE.MeshBasicMaterial[] = [];
  const makeCore = () => {
    const material = new THREE.MeshBasicMaterial({ color: amberEmit.clone().multiplyScalar(CORE_REST), map: falloff, toneMapped: false });
    coreMaterials.push(material);
    return material;
  };
  const shell = new THREE.ShaderMaterial({
    uniforms: { uColor: { value: new THREE.Color(AMBER).multiplyScalar(0.09) }, uPower: { value: 3 } },
    vertexShader: shellVertex, fragmentShader: shellFragment,
    transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
  });
  const line = new THREE.LineBasicMaterial({ color: new THREE.Color(AMBER).lerp(new THREE.Color(INK), 0.45).multiplyScalar(0.95), transparent: true, depthTest: false, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false });
  const faintLine = new THREE.LineBasicMaterial({ color: new THREE.Color(AMBER).multiplyScalar(0.2), transparent: true, depthTest: false, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false });
  const defect = new THREE.MeshBasicMaterial({ color: new THREE.Color(FAIL).multiplyScalar(2.1), transparent: true, depthTest: false, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, toneMapped: false });
  const light = new THREE.MeshBasicMaterial({ color: new THREE.Color(AMBER_DEEP).multiplyScalar(3.2), toneMapped: false });

  // A part is a polished mesh plus its X-ray companions, sharing one transform.
  const addPart = (parent: THREE.Object3D, geometry: THREE.BufferGeometry, outline: THREE.BufferGeometry, material: THREE.Material) => {
    const holder = new THREE.Group();
    holder.add(new THREE.Mesh(geometry, material));
    const body = new THREE.Mesh(geometry, shell);
    body.layers.set(XRAY);
    const edges = new THREE.LineSegments(outline, line);
    edges.layers.set(XRAY);
    holder.add(body, edges);
    parent.add(holder);
    return holder;
  };
  const boxOutline = (w: number, h: number, d: number) => new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d));

  // Backdrop: graphite with a pool of light behind the object on stage.
  const backdrop = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.ShaderMaterial({
    uniforms: {
      uBase: { value: new THREE.Color(GRAPHITE) }, uGlow: { value: new THREE.Color('#ff9d3c') },
      uCenter: { value: new THREE.Vector2() }, uAmount: { value: 1 },
    },
    vertexShader: backdropVertex, fragmentShader: backdropFragment, depthWrite: false,
  }));
  backdrop.position.z = -9;
  backdrop.renderOrder = -1;
  root.add(backdrop);

  // Specimen: four system layers. Each is a chrome tray carrying an amber glass plate.
  const specimen = new THREE.Group();
  root.add(specimen);
  const layerOffsetX = [0.2, -0.14, 0.12, -0.18];
  const layerOffsetZ = [0.12, -0.1, 0.14, -0.1];
  const pairs = layerOffsetX.map(() => {
    const group = new THREE.Group();
    addPart(group, new RoundedBoxGeometry(2.5, 0.11, 1.5, 4, 0.04), boxOutline(2.5, 0.11, 1.5), chrome);
    const glass = makeGlass();
    const plate = addPart(group, new RoundedBoxGeometry(2.36, 0.2, 1.36, 4, 0.05), boxOutline(2.36, 0.2, 1.36), glass);
    plate.position.y = 0.165;
    const core = makeCore();
    const sheet = new THREE.Mesh(new THREE.BoxGeometry(2.12, 0.016, 1.12), core);
    sheet.position.y = 0.165;
    const structure = new THREE.LineSegments(gridLines(2.36, 1.36, 8, 5, 0.165), faintLine);
    structure.layers.set(XRAY);
    group.add(sheet, structure);
    specimen.add(group);
    return { group, glass, core };
  });

  // Flagged defects: only the X-ray view shows them.
  const ring = new THREE.RingGeometry(0.07, 0.086, 40);
  const dot = new THREE.CircleGeometry(0.022, 20);
  const halo = new THREE.RingGeometry(0.13, 0.136, 48);
  const markers = ([[3, 0.62, 0.2], [1, -0.74, -0.3], [0, 0.22, 0.42], [2, -0.2, 0.08], [2, 0.92, -0.4]] as const).map(([pair, x, z], index) => {
    const marker = new THREE.Group();
    for (const geometry of [ring, dot, halo]) {
      const mesh = new THREE.Mesh(geometry, defect);
      mesh.layers.set(XRAY);
      marker.add(mesh);
    }
    marker.position.set(x, 0.28, z);
    pairs[pair]?.group.add(marker);
    return { marker, phase: index * 1.3, parent: pairs[pair]?.group };
  });

  // Cal.diy gate: a chrome frame around one glass slot, with twenty contenders.
  const gate = new THREE.Group();
  root.add(gate);
  const frameShape = roundedRect(2.7, 1.6, 0.42);
  frameShape.holes.push(roundedRect(1.95, 0.86, 0.2));
  const frameGeometry = new THREE.ExtrudeGeometry(frameShape, { depth: 0.5, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 4, curveSegments: 20 }).center();
  const frameOutline = new THREE.EdgesGeometry(new THREE.ExtrudeGeometry(frameShape, { depth: 0.6, bevelEnabled: false, curveSegments: 20 }).center(), 35);
  addPart(gate, frameGeometry, frameOutline, chrome);
  addPart(gate, new RoundedBoxGeometry(1.9, 0.82, 0.34, 4, 0.05), boxOutline(1.9, 0.82, 0.34), makeGlass());
  const slotCore = makeCore();
  gate.add(new THREE.Mesh(new THREE.BoxGeometry(1.66, 0.6, 0.016), slotCore));
  const contenderGeometry = new RoundedBoxGeometry(0.075, 0.075, 0.44, 2, 0.02);
  const contenderMaterial = new THREE.MeshStandardMaterial({ metalness: 0.85, roughness: 0.32, envMapIntensity: 1.2 });
  const contenders = new THREE.InstancedMesh(contenderGeometry, contenderMaterial, 19);
  contenders.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  const contenderGhosts = new THREE.InstancedMesh(contenderGeometry, shell, 19);
  contenderGhosts.instanceMatrix = contenders.instanceMatrix;
  contenderGhosts.layers.set(XRAY);
  contenders.frustumCulled = false;
  contenderGhosts.frustumCulled = false;
  const winner = new THREE.Mesh(contenderGeometry, light);
  winner.layers.enable(XRAY);
  gate.add(contenders, contenderGhosts, winner);
  const contenderGray = new THREE.Color('#8a8072');
  const contenderDim = new THREE.Color('#2c2824');

  // LLM prisms: two facing measurements joined by a beam.
  const prisms = new THREE.Group();
  root.add(prisms);
  const prismShape = triangle(1);
  prismShape.holes.push(triangle(0.64));
  const prismGeometry = new THREE.ExtrudeGeometry(prismShape, { depth: 0.44, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 3 }).center();
  const prismOutline = new THREE.EdgesGeometry(new THREE.ExtrudeGeometry(prismShape, { depth: 0.52, bevelEnabled: false }).center(), 35);
  const prismCore = new THREE.ExtrudeGeometry(triangle(0.62), { depth: 0.3, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 3 }).center();
  const prismCoreOutline = new THREE.EdgesGeometry(new THREE.ExtrudeGeometry(triangle(0.62), { depth: 0.36, bevelEnabled: false }).center(), 35);
  const prismLight = new THREE.ExtrudeGeometry(triangle(0.5), { depth: 0.016, bevelEnabled: false }).center();
  const prismLightMaterial = makeCore();
  const prismPair = [-1, 1].map(direction => {
    const group = new THREE.Group();
    addPart(group, prismGeometry, prismOutline, chrome);
    addPart(group, prismCore, prismCoreOutline, makeGlass());
    group.add(new THREE.Mesh(prismLight, prismLightMaterial));
    prisms.add(group);
    return { group, direction };
  });
  const beamGeometry = new THREE.BoxGeometry(1, 0.026, 0.026).translate(0.5, 0, 0);
  const beam = new THREE.Mesh(beamGeometry, light);
  beam.layers.enable(XRAY);
  prisms.add(beam);

  // Archive fan: six plates, one per framework.
  const fan = new THREE.Group();
  root.add(fan);
  const plateGeometry = new RoundedBoxGeometry(0.86, 1.9, 0.11, 4, 0.04).translate(0, 1.75, 0);
  const plateOutline = new THREE.EdgesGeometry(new THREE.BoxGeometry(0.86, 1.9, 0.11).translate(0, 1.75, 0));
  const plateLight = new THREE.BoxGeometry(0.68, 1.7, 0.012).translate(0, 1.75, 0);
  const plates = Array.from({ length: 6 }, (_, index) => {
    const pivot = new THREE.Group();
    const lit = index % 2 === 1;
    addPart(pivot, plateGeometry, plateOutline, lit ? makeGlass() : chrome);
    if (lit) pivot.add(new THREE.Mesh(plateLight, makeCore()));
    pivot.position.set(0, -1.75, (index - 2.5) * 0.16);
    fan.add(pivot);
    return pivot;
  });

  // Career column: thin chrome slabs with a lit seam between them. It stands for a platform built
  // up module by module; the count matches the stated modules and encodes nothing else.
  const tower = new THREE.Group();
  root.add(tower);
  const slabGeometry = new RoundedBoxGeometry(1.5, 0.062, 0.95, 2, 0.02);
  const slabs = new THREE.InstancedMesh(slabGeometry, chrome, SLABS);
  slabs.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  const slabGhosts = new THREE.InstancedMesh(slabGeometry, shell, SLABS);
  slabGhosts.instanceMatrix = slabs.instanceMatrix;
  slabGhosts.layers.set(XRAY);
  const seams = new THREE.InstancedMesh(new THREE.BoxGeometry(1.36, 0.02, 0.81), light, SLABS);
  seams.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  seams.layers.enable(XRAY);
  slabs.frustumCulled = false;
  slabGhosts.frustumCulled = false;
  seams.frustumCulled = false;
  tower.add(slabs, slabGhosts, seams);

  // Render targets and passes.
  const targetOptions = { type: THREE.HalfFloatType, samples: lite ? 0 : 4 };
  const surfaceTarget = new THREE.WebGLRenderTarget(2, 2, targetOptions);
  const xrayTarget = new THREE.WebGLRenderTarget(2, 2, targetOptions);
  const trailSize = new THREE.Vector2(256, 256);
  const trailOptions = { type: THREE.HalfFloatType, depthBuffer: false, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter };
  let trailRead = new THREE.WebGLRenderTarget(trailSize.x, trailSize.y, trailOptions);
  let trailWrite = new THREE.WebGLRenderTarget(trailSize.x, trailSize.y, trailOptions);
  const trailMaterial = new THREE.ShaderMaterial({
    uniforms: {
      tPrev: { value: null }, uFrom: { value: new THREE.Vector2(0.5, 0.5) }, uTo: { value: new THREE.Vector2(0.5, 0.5) },
      uTexel: { value: new THREE.Vector2(1 / trailSize.x, 1 / trailSize.y) }, uAspect: { value: 1 }, uRadius: { value: 0.115 },
      uStrength: { value: 0 }, uDecay: { value: 0.97 }, uTime: { value: 0 },
    },
    vertexShader: fullscreenVertex, fragmentShader: trailFragment, depthTest: false, depthWrite: false,
  });
  const trailQuad = new FullScreenQuad(trailMaterial);
  const compositeMaterial = new THREE.ShaderMaterial({
    uniforms: {
      tSurface: { value: surfaceTarget.texture }, tXray: { value: xrayTarget.texture }, tTrail: { value: null },
      uTrailTexel: { value: new THREE.Vector2(1 / trailSize.x, 1 / trailSize.y) }, uAmber: { value: new THREE.Color(AMBER) },
      uPixelRatio: { value: 1 }, uTime: { value: 0 }, uXray: { value: 0 },
    },
    vertexShader: fullscreenVertex, fragmentShader: compositeFragment, depthTest: false, depthWrite: false,
  });
  const composer = new EffectComposer(renderer);
  composer.addPass(new ShaderPass(compositeMaterial));
  const bloom = lite ? undefined : new UnrealBloomPass(new THREE.Vector2(256, 256), 0.34, 0.6, 1);
  if (bloom) composer.addPass(bloom);
  composer.addPass(new OutputPass());

  // Pointer. The lens follows it; without one, a slow automatic scan hints at the interaction.
  const pointer = { x: 0.5, y: 0.5, present: false, moved: -100 };
  const stamp = new THREE.Vector2(0.5, 0.5);
  // In the method chapter the lens is led to the layer in focus unless the visitor is moving it.
  const led = { active: false, x: 0.5, y: 0.5 };
  const ledStep = [0, 3, 1, 2];
  let stamped = false;
  let energy = 0;
  let time = 0;
  const onMove = (event: PointerEvent) => {
    pointer.x = event.clientX / window.innerWidth;
    pointer.y = 1 - event.clientY / window.innerHeight;
    pointer.present = true;
    pointer.moved = time;
  };
  const onLeave = () => { pointer.present = false; };
  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerdown', onMove, { passive: true });
  document.documentElement.addEventListener('pointerleave', onLeave);
  window.addEventListener('blur', onLeave);

  const view = { width: 8, height: 5, aspect: 1.6 };
  const state = { story: 0, local: new Float32Array(sceneState.local.length), tiltX: 0, tiltY: 0, intro: 0, first: true };
  const matrix = new THREE.Matrix4();
  const position = new THREE.Vector3();
  const quaternion = new THREE.Quaternion();
  const scale = new THREE.Vector3();
  const euler = new THREE.Euler();
  const color = new THREE.Color();
  const projected = new THREE.Vector3();
  const focus = new THREE.Vector3();

  // Where an object rests on screen: beside the copy on wide screens, above it on narrow ones.
  const anchor = (side: number, lift: number, out: THREE.Vector3, narrowLift = 0.19) => {
    if (view.aspect > 1.05) out.set(side * view.width * 0.235, lift * view.height, 0);
    else out.set(0, view.height * narrowLift, 0);
    return out;
  };
  const anchorA = new THREE.Vector3();
  const anchorB = new THREE.Vector3();

  // Objects arrive from below and leave upward, following the page. distance is in chapters.
  const narrow = () => view.aspect <= 1.05;
  // On narrow screens an object keeps to the window reserved at the top of its chapter.
  const windowY = (station: number, center: number) => view.height * (0.5 - ((sceneState.tops[station] ?? 0) + center));
  const place = (group: THREE.Object3D, station: number, distance: number, side: number, lift: number, size: number) => {
    if (narrow()) {
      const y = windowY(station, 0.25);
      group.visible = Math.abs(distance) < 1.5 && Math.abs(y) < view.height * 0.95;
      if (!group.visible) return false;
      group.position.set(0, y, 0);
      group.scale.setScalar(size);
      if (Math.abs(distance) < 0.5) focus.copy(group.position);
      return true;
    }
    group.visible = Math.abs(distance) < 1;
    if (!group.visible) return false;
    anchor(side, lift, anchorA);
    const travel = Math.sign(distance) * smooth(Math.abs(distance));
    group.position.set(anchorA.x, anchorA.y + travel * view.height * 1.15, 0);
    group.scale.setScalar(size * (1 - 0.18 * Math.abs(travel)));
    if (Math.abs(distance) < 0.5) focus.copy(group.position);
    return true;
  };

  const updateSpecimen = (story: number, size: number) => {
    const chain = story < 5;
    // Between the archive and the closing the specimen returns once, laid open for inspection.
    const inspected = !chain && Math.abs(story - S.method) < 1;
    const toLayers = chain ? smooth(story) : 0;
    const toRow = chain ? smooth(story - 1) : 0;
    const distance = chain ? Math.max(0, story - S.testpulse) : inspected ? story - S.method : story - S.closing;
    specimen.visible = Math.abs(distance) < 1;
    led.active = false;
    if (!specimen.visible) return;

    anchor(0.3, -0.01, anchorA, 0.03);
    anchor(1, 0, anchorB);
    anchorA.lerp(anchorB, toLayers);
    anchor(1, 0.13, anchorB);
    anchorA.lerp(anchorB, toRow);
    if (!chain) anchor(1.42, 0.3, anchorA, 0.3);
    if (inspected) anchor(-1, 0.02, anchorA);
    let travel = Math.sign(distance) * smooth(Math.abs(distance));
    const bob = Math.sin(time * 0.7) * 0.035;
    specimen.position.set(anchorA.x, anchorA.y + bob + travel * view.height * 1.15, 0);
    if (narrow()) {
      travel = 0;
      const y = chain ? lerp(lerp(windowY(S.hero, 0.43), windowY(S.layers, 0.25), toLayers), windowY(S.testpulse, 0.25), toRow) : inspected ? windowY(S.method, 0.25) : windowY(S.closing, 0.2);
      specimen.visible = Math.abs(y) < view.height * 0.95;
      if (!specimen.visible) return;
      specimen.position.set(0, y + bob, 0);
    }
    const intro = smooth(state.intro);
    const base = (chain ? lerp(lerp(1, 0.94, toLayers), 1.02, toRow) : inspected ? 0.86 : 0.92) * size;
    specimen.scale.setScalar(base * (1 - 0.18 * Math.abs(travel)) * lerp(0.72, 1, intro));
    const spin = chain || inspected ? 0 : time * 0.12;
    if (inspected) {
      // Seen from above at three quarters, so every layer shows its face to the lens and keeps its depth.
      specimen.rotation.set(0.7 + state.tiltX, 0.42 + state.tiltY + Math.sin(time * 0.3) * 0.04, -0.06);
    } else {
      specimen.rotation.set(
        lerp(lerp(0.46, 0.42, toLayers), 0.05, toRow) + state.tiltX + (1 - intro) * 0.5,
        lerp(lerp(-0.62, -0.86, toLayers), -0.3, toRow) + state.tiltY + Math.sin(time * 0.38) * 0.05 + spin - (1 - intro) * 1.1,
        lerp(0.09, 0, Math.max(toLayers, toRow)),
      );
    }
    if (Math.abs(distance) < 0.5) focus.copy(specimen.position);

    const layerProgress = state.local[S.layers] ?? 0;
    const rowProgress = state.local[S.testpulse] ?? 0;
    const scan = Math.min(3.999, (state.local[S.method] ?? 0) * 4);
    const explode = inspected ? 0.34 : toLayers * (1 - toRow);
    pairs.forEach(({ group, glass, core }, index) => {
      // Layer 0 in the sentence is the top plate.
      const word = 3 - index;
      const from = 0.14 + word * 0.2;
      if (inspected) {
        // One layer per step, top first. The layer in focus lights and lifts a little toward the lens.
        const focused = ramp(scan - word, -0.12, 0.1) * (1 - ramp(scan - word, 0.9, 1.12));
        group.position.set((layerOffsetX[index] ?? 0) * 0.6, (index - 1.5) * lerp(0.37, 0.98, explode) + focused * 0.12, (layerOffsetZ[index] ?? 0) * 0.6);
        group.rotation.set(0, 0, 0);
        group.scale.setScalar(1);
        glass.attenuationColor.copy(amberDeep);
        glass.emissive.copy(amberEmit);
        core.color.copy(amberEmit).multiplyScalar(CORE_REST * 0.3 + focused * 1.9);
        return;
      }
      const focused = explode * ramp(layerProgress, from - 0.05, from + 0.03) * (1 - ramp(layerProgress, from + 0.17, from + 0.25));
      const ox = layerOffsetX[index] ?? 0;
      const oz = layerOffsetZ[index] ?? 0;
      const stackY = (index - 1.5) * lerp(0.37, 0.98, explode);
      const inRow = index < 3;
      const rowX = (index - 1) * (narrow() ? 0.9 : 1.42);
      const rowScale = narrow() ? 0.34 : 0.52;
      group.position.set(
        lerp(ox * lerp(1, 0.3, explode) + focused * 0.22, inRow ? rowX : 0, toRow),
        lerp(stackY, inRow ? 0 : -1.2, toRow),
        lerp(oz * lerp(1, 0.3, explode) + focused * 0.5, 0, toRow),
      );
      group.rotation.set(lerp(0, Math.PI / 2 - 0.42, toRow), lerp(0, (index - 1) * -0.2, toRow), lerp(0, (index - 1) * 0.05, toRow));
      group.scale.setScalar(lerp(1, inRow ? rowScale : 0.001, toRow));

      // TestPulse: three recorded observations light in order. The second one failed.
      const lit = inRow ? toRow * ramp(rowProgress, 0.15 + index * 0.3, 0.27 + index * 0.3) : 0;
      const failed = index === 1 ? lit : 0;
      glass.attenuationColor.copy(amberDeep).lerp(failColor, failed);
      glass.emissive.copy(amberEmit).lerp(failColor, failed);
      core.color.copy(amberEmit).lerp(failColor, failed).multiplyScalar(CORE_REST * (1 - toRow * 0.82) * (1 - explode * 0.55 * (1 - focused)) + focused * 2.3 + lit * (failed > 0 ? 1.5 : 0.85));
    });

    markers.forEach(({ marker, phase, parent }) => {
      if (!parent) return;
      parent.getWorldQuaternion(quaternion).invert();
      marker.quaternion.copy(quaternion).multiply(camera.quaternion);
      marker.scale.setScalar((1 + Math.sin(time * 2.2 + phase) * 0.14) / Math.max(parent.scale.x, 0.01) * Math.min(parent.scale.x, 1));
    });

    // Lead the lens to the flagged point on the layer in focus, gliding between steps.
    if (inspected && Math.abs(distance) < 0.6) {
      const step = Math.floor(scan);
      const glide = smooth((scan - step - 0.82) / 0.18);
      const here = markers[ledStep[step] ?? 0]?.marker;
      const next = markers[ledStep[Math.min(3, step + 1)] ?? 0]?.marker;
      if (here && next) {
        here.getWorldPosition(projected).project(camera);
        const x = projected.x;
        const y = projected.y;
        next.getWorldPosition(projected).project(camera);
        led.x = lerp(x, projected.x, glide) * 0.5 + 0.5;
        led.y = lerp(y, projected.y, glide) * 0.5 + 0.5;
        led.active = true;
      }
    }
  };

  const updateGate = (story: number, size: number) => {
    if (!place(gate, S.caldiy, story - S.caldiy, -1, 0.03, size * 0.98)) return;
    const run = state.local[S.caldiy] ?? 0;
    // On wide screens the opening faces away from the copy, so contenders arrive from the outer edge.
    const facing = narrow() ? 1 : -1;
    gate.rotation.set(lerp(0.3, 0.14, smooth(run)) + state.tiltX, facing * lerp(0.95, 0.5, smooth(run)) + state.tiltY + Math.sin(time * 0.4) * 0.04, facing * lerp(0.14, 0.03, smooth(run)));
    for (let index = 0; index < 19; index += 1) {
      const delay = hash(index + 3) * 0.3;
      const approach = 1 - Math.pow(1 - clamp01((run - 0.06 - delay) / 0.4), 3);
      const retreat = smooth((run - 0.52 - delay) / 0.3);
      const startX = (hash(index) - 0.5) * 2.6;
      const startY = (hash(index + 7) - 0.5) * 1.5;
      position.set(lerp(startX, startX * 0.42, approach), lerp(startY, startY * 0.36, approach), lerp(2.6 + hash(index + 13) * 1.4, 0.56, approach) + retreat * (0.5 + hash(index + 21) * 0.7));
      euler.set(retreat * (hash(index + 5) - 0.5) * 0.9, retreat * (hash(index + 9) - 0.5) * 0.9, 0);
      quaternion.setFromEuler(euler);
      scale.setScalar(1);
      contenders.setMatrixAt(index, matrix.compose(position, quaternion, scale));
      contenders.setColorAt(index, color.copy(contenderGray).lerp(contenderDim, retreat));
    }
    contenders.instanceMatrix.needsUpdate = true;
    if (contenders.instanceColor) contenders.instanceColor.needsUpdate = true;
    const pass = 1 - Math.pow(1 - clamp01((run - 0.16) / 0.5), 3);
    winner.position.set(lerp(0.25, 0, pass), lerp(-0.15, 0, pass), lerp(3.4, 0.05, pass));
    winner.scale.setScalar(1 - ramp(run, 0.6, 0.72) * 0.9);
    slotCore.color.copy(amberEmit).multiplyScalar(CORE_REST * 0.55 + ramp(run, 0.58, 0.8) * 1.7);
  };

  const updatePrisms = (story: number, size: number) => {
    if (!place(prisms, S.llm, story - S.llm, 1, 0.12, size * (narrow() ? 0.62 : 0.92))) return;
    const converge = smooth(state.local[S.llm] ?? 0);
    prisms.rotation.set(0.16 + state.tiltX, -0.28 + state.tiltY + Math.sin(time * 0.36) * 0.05, 0);
    const gap = lerp(2.05, 1.18, converge);
    prismPair.forEach(({ group, direction }) => {
      group.position.set(direction * gap, 0, 0);
      group.rotation.set(0, direction < 0 ? lerp(0.75, 0.18, converge) : Math.PI - lerp(0.75, 0.18, converge), direction * lerp(0.2, 0, converge));
    });
    // The bridge covers 82 percent of the distance between the two readings.
    const span = (gap - 0.84) * 2;
    beam.position.set(-span / 2, 0, 0);
    beam.scale.set(Math.max(0.001, span * 0.82 * ramp(state.local[S.llm] ?? 0, 0.35, 0.85)), 1, 1);
  };

  const updateTower = (story: number, size: number) => {
    if (!place(tower, S.career, story - S.career, 1, 0, size * (narrow() ? 0.72 : 0.96))) return;
    const built = (state.local[S.career] ?? 0) * 1.12 + 0.2;
    tower.rotation.set(0.3 + state.tiltX, -0.62 + state.tiltY + Math.sin(time * 0.3) * 0.07, 0.04);
    for (let index = 0; index < SLABS; index += 1) {
      // A few slabs are standing when the chapter arrives. The rest land in order, from alternate sides.
      const turn = built - index / SLABS;
      const landed = 1 - Math.pow(1 - clamp01(turn / 0.16), 3);
      const side = index % 2 === 0 ? 1 : -1;
      position.set((1 - landed) * side * 1.5, (index - (SLABS - 1) / 2) * 0.105 + (1 - landed) * 0.5, 0);
      euler.set(0, (1 - landed) * side * 0.7, 0);
      quaternion.setFromEuler(euler);
      scale.setScalar(landed > 0.001 ? lerp(0.55, 1, landed) : 0.0001);
      slabs.setMatrixAt(index, matrix.compose(position, quaternion, scale));
      // The seam above a slab lights as it settles, bright at first and then at rest.
      position.y += 0.0525;
      scale.setScalar(landed > 0.97 && index < SLABS - 1 ? 1 : 0.0001);
      seams.setMatrixAt(index, matrix.compose(position, quaternion, scale));
      seams.setColorAt(index, color.setScalar(lerp(1, 0.28, ramp(turn, 0.16, 0.36))));
    }
    slabs.instanceMatrix.needsUpdate = true;
    seams.instanceMatrix.needsUpdate = true;
    if (seams.instanceColor) seams.instanceColor.needsUpdate = true;
  };

  const updateFan = (story: number, size: number) => {
    if (!place(fan, S.archive, story - S.archive, 0, 0.1, size * 0.9)) return;
    const open = lerp(0.12, 1, smooth((state.local[S.archive] ?? 0) * 1.5));
    fan.rotation.set(0.18 + state.tiltX, -0.55 + state.tiltY + Math.sin(time * 0.33) * 0.06, 0);
    plates.forEach((pivot, index) => { pivot.rotation.z = -(index - 2.5) * 0.33 * open; });
  };

  // Quality governor: level 0 is full quality, level 1 renders smaller without bloom or
  // multisampling, level 2 hands the page back to its still. The rules live in governor.ts.
  const sizing = { width: 2, height: 2, pixelRatio: 1 };
  const governor = createGovernor();
  const layout = () => {
    const ratio = sizing.pixelRatio * (governor.level === 0 ? 1 : 0.6);
    const samples = governor.level === 0 && !lite ? 4 : 0;
    if (surfaceTarget.samples !== samples) {
      surfaceTarget.samples = samples;
      xrayTarget.samples = samples;
      surfaceTarget.dispose();
      xrayTarget.dispose();
    }
    surfaceTarget.setSize(Math.max(2, Math.round(sizing.width * ratio)), Math.max(2, Math.round(sizing.height * ratio)));
    xrayTarget.setSize(surfaceTarget.width, surfaceTarget.height);
    composer.setPixelRatio(ratio);
    composer.setSize(sizing.width, sizing.height);
    compositeMaterial.uniforms.uPixelRatio!.value = ratio;
    if (bloom) bloom.enabled = governor.level === 0;
  };
  let handedBack = false;
  const govern = (elapsed: number) => {
    const step = governor.step(elapsed);
    if (step === 'stopped') {
      if (!handedBack) { handedBack = true; window.dispatchEvent(new Event('scene:slow')); }
      return false;
    }
    if (step === 'changed') layout();
    return true;
  };

  // Compile the scene's programs off the critical path where the driver allows it, so the first
  // frame does not stall the page. Rendering starts when they are ready.
  let compiled = false;
  let disposed = false;
  const markCompiled = () => { compiled = true; };
  renderer.compileAsync(scene, camera).then(markCompiled, markCompiled);

  const renderScene = (target: THREE.WebGLRenderTarget, layer: number) => {
    camera.layers.set(layer);
    renderer.setRenderTarget(target);
    renderer.clear();
    renderer.render(scene, camera);
  };

  return {
    resize(width, height, pixelRatio) {
      sizing.width = width;
      sizing.height = height;
      sizing.pixelRatio = pixelRatio;
      layout();
      view.aspect = width / height;
      view.height = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
      view.width = view.height * view.aspect;
      const depth = (camera.position.z - backdrop.position.z) / camera.position.z;
      backdrop.scale.set(view.width * depth * 1.3, view.height * depth * 1.3, 1);
      trailMaterial.uniforms.uAspect!.value = view.aspect;
    },

    frame(rawDelta) {
      if (!compiled || disposed || document.hidden || sceneState.covered >= 1 || governor.level > 1) return;
      if (!govern(rawDelta)) return;
      const delta = Math.min(rawDelta, 0.05);
      time += delta;

      // Follow the scroll with a short lag so stage moves feel weighted.
      const rate = state.first ? 1000 : 7;
      state.story = damp(state.story, sceneState.story, rate, delta);
      for (let index = 0; index < state.local.length; index += 1) state.local[index] = damp(state.local[index] ?? 0, sceneState.local[index] ?? 0, rate, delta);
      state.intro = damp(state.intro, sceneState.intro, 2.4, delta);
      state.first = false;
      state.tiltY = damp(state.tiltY, (pointer.x - 0.5) * 0.34, 3, delta);
      state.tiltX = damp(state.tiltX, (pointer.y - 0.5) * -0.22, 3, delta);
      camera.position.x = damp(camera.position.x, (pointer.x - 0.5) * 0.4, 2.5, delta);
      camera.position.y = damp(camera.position.y, (pointer.y - 0.5) * 0.26, 2.5, delta);
      camera.lookAt(0, 0, 0);
      camera.updateMatrixWorld();

      const size = view.aspect > 1.05 ? THREE.MathUtils.clamp(view.width / 8.6, 0.74, 1.12) : THREE.MathUtils.clamp(view.width / 3.5, 0.5, 0.82);
      focus.set(0, 0, 0);
      updateSpecimen(state.story, size);
      updateGate(state.story, size);
      updatePrisms(state.story, size);
      updateFan(state.story, size);
      updateTower(state.story, size);
      const depth = (camera.position.z - backdrop.position.z) / camera.position.z;
      const glow = backdrop.material.uniforms;
      (glow.uCenter!.value as THREE.Vector2).lerp(new THREE.Vector2(focus.x * depth, focus.y * depth), 1 - Math.exp(-3 * delta));
      kick.position.set(focus.x - 3.2, focus.y - 1.4, 3.5);

      // Lens trail.
      const idle = time - pointer.moved;
      const scanning = idle > 4 && state.story < 0.45 && state.intro > 0.9;
      let strength = 0;
      let radius = lite ? 0.1 : 0.118;
      const to = trailMaterial.uniforms.uTo!.value as THREE.Vector2;
      const from = trailMaterial.uniforms.uFrom!.value as THREE.Vector2;
      if (led.active && idle > 1.4) {
        to.set(led.x + Math.cos(time * 0.9) * 0.012 / view.aspect, led.y + Math.sin(time * 1.3) * 0.012);
        strength = 0.95;
        radius *= 0.92;
      } else if (scanning) {
        projected.copy(specimen.position).project(camera);
        to.set(projected.x * 0.5 + 0.5 + Math.cos(time * 0.7) * 0.1 / view.aspect * 1.6, projected.y * 0.5 + 0.5 + Math.sin(time * 1.05) * 0.13);
        strength = 0.92;
        radius *= 0.72;
      } else if (pointer.present) {
        to.set(pointer.x, pointer.y);
        strength = 1;
      }
      from.copy(stamped && strength > 0 ? stamp : to);
      stamp.copy(to);
      stamped = strength > 0;
      trailMaterial.uniforms.uStrength!.value = strength;
      trailMaterial.uniforms.uRadius!.value = radius;
      trailMaterial.uniforms.uDecay!.value = Math.exp(-delta * 1.25);
      trailMaterial.uniforms.uTime!.value = time;
      trailMaterial.uniforms.tPrev!.value = trailRead.texture;
      renderer.setRenderTarget(trailWrite);
      trailQuad.render(renderer);
      [trailRead, trailWrite] = [trailWrite, trailRead];
      energy = Math.max(energy * Math.exp(-delta * 1.1), strength);

      renderScene(surfaceTarget, SURFACE);
      const inspecting = energy > 0.03;
      if (inspecting) renderScene(xrayTarget, XRAY);
      camera.layers.set(SURFACE);
      compositeMaterial.uniforms.tTrail!.value = trailRead.texture;
      compositeMaterial.uniforms.uXray!.value = inspecting ? 1 : 0;
      compositeMaterial.uniforms.uTime!.value = time;
      renderer.setRenderTarget(null);
      composer.render(delta);

      if (!sceneState.ready) {
        sceneState.ready = true;
        window.dispatchEvent(new Event('scene:ready'));
      }
    },

    dispose() {
      disposed = true;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('blur', onLeave);
      scene.remove(root);
      scene.environment = null;
      root.traverse(object => {
        if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments) object.geometry.dispose();
      });
      for (const material of [chrome, shell, line, faintLine, defect, light, contenderMaterial, backdrop.material, trailMaterial, compositeMaterial, ...glassMaterials, ...coreMaterials]) material.dispose();
      for (const target of [surfaceTarget, xrayTarget, trailRead, trailWrite, environment]) target.dispose();
      falloff.dispose();
      trailQuad.dispose();
      bloom?.dispose();
      composer.dispose();
      sceneState.ready = false;
    },
  };
}
