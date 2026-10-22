import { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, RoundedBox } from '@react-three/drei';
import type { Group } from 'three';
import { inspectionState } from '../lib/inspection-state';
import type { InspectionCanvasProps } from './InspectionIsland';

function Layers() {
  const group = useRef<Group>(null);
  useFrame(({ pointer }) => {
    if (!group.current) return;
    const separation = 0.24 + inspectionState.spread * 0.55 + inspectionState.scroll * 0.25;
    group.current.rotation.set(.12 + pointer.y * .035, -.35 + inspectionState.scroll * .25 + pointer.x * .06, -.035);
    group.current.children.forEach((layer, index) => {
      layer.position.y = (index - 2) * separation;
      layer.position.x = (index - 2) * (.1 + inspectionState.spread * .15);
    });
  });
  return <group ref={group}>{Array.from({ length: 5 }, (_, index) => <RoundedBox key={index} args={[3.8, .16, 2.35]} radius={.035} smoothness={3} position={[0, (index - 2) * .45, 0]}>
    {index % 2 === 0 ? <meshStandardMaterial color="#45484d" metalness={1} roughness={.2} envMapIntensity={1.7} /> : <meshPhysicalMaterial color="#ffc981" metalness={0} roughness={.08} transmission={1} thickness={.35} attenuationColor="#ffae44" attenuationDistance={1.8} ior={1.45} clearcoat={1} envMapIntensity={1.2} />}
  </RoundedBox>)}</group>;
}

function Lifecycle({ onReady, onFailure }: InspectionCanvasProps) {
  const { gl, invalidate } = useThree();
  useEffect(() => {
    inspectionState.invalidate = invalidate;
    const frame = requestAnimationFrame(onReady);
    const lost = (event: Event) => { event.preventDefault(); onFailure(); };
    const move = () => invalidate();
    gl.domElement.addEventListener('webglcontextlost', lost);
    gl.domElement.addEventListener('pointermove', move);
    return () => {
      cancelAnimationFrame(frame);
      gl.domElement.removeEventListener('webglcontextlost', lost);
      gl.domElement.removeEventListener('pointermove', move);
      if (inspectionState.invalidate === invalidate) inspectionState.invalidate = null;
    };
  }, [gl, invalidate, onReady, onFailure]);
  return null;
}

export default function InspectionCanvas(props: InspectionCanvasProps) {
  return <Canvas aria-hidden="true" frameloop="demand" dpr={[1, 1.5]} camera={{ position: [5.6, 4.5, 8.8], fov: 35 }} gl={{ antialias: true, alpha: false, powerPreference: 'low-power' }}>
    <color attach="background" args={['#111110']} />
    <ambientLight intensity={.7} />
    <directionalLight position={[3, 5, 4]} intensity={2.5} color="#f4f5f7" />
    <directionalLight position={[-3, 2, -1]} intensity={1.2} color="#eab76a" />
    <Environment resolution={128} frames={1}>
      <Lightformer form="rect" intensity={5} position={[0, 5, -1]} rotation-x={Math.PI / 2} scale={[6, 4, 1]} color="#f4f5f7" />
      <Lightformer form="rect" intensity={2} position={[-5, 1, 0]} rotation-y={Math.PI / 2} scale={[1, 6, 1]} color="#ffb249" />
      <Lightformer form="rect" intensity={4} position={[3, 1, 4]} rotation-y={Math.PI} scale={[4, 3, 1]} color="#eef0f4" />
    </Environment>
    <group position={[0, .35, 0]}><Layers /></group>
    <mesh rotation-x={-Math.PI / 2} position={[0, -2.5, 0]}><planeGeometry args={[200, 200]} /><meshStandardMaterial color="#161718" metalness={.45} roughness={.45} /></mesh>
    <Lifecycle {...props} />
  </Canvas>;
}
