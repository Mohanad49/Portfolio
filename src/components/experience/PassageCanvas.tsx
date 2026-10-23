import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Environment, MeshTransmissionMaterial, RoundedBox } from '@react-three/drei';
import { EquirectangularReflectionMapping, NoColorSpace, RepeatWrapping, SRGBColorSpace, TextureLoader, type Group, type Texture } from 'three';
import { inspectionState } from '../../lib/inspection-state';

export interface PassageSceneProps { metalUrl: string; environmentUrl: string; onReady: () => void; onFailure: () => void; }
const layerHeights = [2.8, 1.6, .4, -1.8, -3];

function Specimen({ metal, surface, environment }: { metal: Texture; surface: Texture; environment: Texture }) {
  const group = useRef<Group>(null);
  useFrame(({ camera }) => {
    const progress = inspectionState.scroll;
    const specimen = group.current;
    if (!specimen) return;
    const opening = Math.min(progress / .7, 1);
    specimen.position.set(4.1 - opening * .5, .4, 0);
    specimen.rotation.set(.04, -.32 + opening * .12, .09);
    layerHeights.forEach((height, index) => {
      const layer = specimen.children[index];
      if (!layer) return;
      layer.position.y = height + (index < 3 ? 1 : -1) * opening * (.7 + Math.abs(index - 2) * .15);
      layer.position.x = (index - 2) * .12;
    });
    camera.position.set(2.4, 2.6 - opening * 1.6, 9.2 - opening * 2.1);
    camera.lookAt(.4 + opening * .3, .2, -1);
  });
  return <group ref={group} position={[4.1, .4, 0]} rotation={[.04, -.32, .09]}>
    {layerHeights.map((height, index) => <RoundedBox key={index} args={[8, .22, 3.7]} radius={.035} smoothness={3} position={[0, height, 0]}>
      {index % 2 === 0
        ? <meshStandardMaterial color="#e2e5e8" map={metal} bumpMap={surface} bumpScale={.025} roughnessMap={surface} metalness={1} roughness={.45} envMapIntensity={2} />
        : <MeshTransmissionMaterial color="#ffcf86" background={environment} transmission={1} roughness={.045} thickness={.3} attenuationColor="#e89728" attenuationDistance={4} ior={1.35} clearcoat={1} chromaticAberration={.004} anisotropicBlur={.01} distortion={0} temporalDistortion={0} resolution={256} samples={2} />}
    </RoundedBox>)}
  </group>;
}

function SceneLifecycle({ onReady, onFailure }: Pick<PassageSceneProps, 'onReady' | 'onFailure'>) {
  const { gl, invalidate } = useThree();
  useEffect(() => {
    inspectionState.invalidate = invalidate;
    const readyFrame = requestAnimationFrame(() => { invalidate(); onReady(); });
    const lost = (event: Event) => { event.preventDefault(); onFailure(); };
    gl.domElement.addEventListener('webglcontextlost', lost);
    return () => {
      cancelAnimationFrame(readyFrame);
      gl.domElement.removeEventListener('webglcontextlost', lost);
      if (inspectionState.invalidate === invalidate) inspectionState.invalidate = null;
    };
  }, [gl, invalidate, onReady, onFailure]);
  return null;
}

function MaterialScene(props: PassageSceneProps) {
  const [metalSource, reflectionSource] = useLoader(TextureLoader, [props.metalUrl, props.environmentUrl]);
  const textures = useMemo(() => {
    if (!metalSource || !reflectionSource) throw new Error('The inspection materials did not load.');
    const metal = metalSource.clone();
    metal.colorSpace = SRGBColorSpace;
    metal.wrapS = metal.wrapT = RepeatWrapping;
    metal.repeat.set(3, 2);
    const surface = metal.clone();
    surface.colorSpace = NoColorSpace;
    const environment = reflectionSource.clone();
    environment.colorSpace = SRGBColorSpace;
    environment.mapping = EquirectangularReflectionMapping;
    return { metal, surface, environment };
  }, [metalSource, reflectionSource]);
  useEffect(() => () => { Object.values(textures).forEach(texture => texture.dispose()); }, [textures]);
  return <>
    <ambientLight intensity={.25} />
    <directionalLight position={[-3, 5, 4]} intensity={2} color="#fff3de" />
    <directionalLight position={[5, 1, 2]} intensity={1.2} color="#ffc368" />
    <Environment map={textures.environment} environmentIntensity={2} />
    <Specimen {...textures} />
    <SceneLifecycle {...props} />
  </>;
}

export default function PassageCanvas(props: PassageSceneProps) {
  return <Canvas aria-hidden="true" frameloop="demand" dpr={[1, 1.25]} camera={{ position: [2.4, 2.6, 9.2], fov: 35 }} gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}>
    <MaterialScene {...props} />
  </Canvas>;
}
