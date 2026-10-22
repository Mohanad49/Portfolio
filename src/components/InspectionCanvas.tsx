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
    {index % 2 === 0 ? <meshStandardMaterial color="#3a3631" metalness={.88} roughness={.24} /> : <meshPhysicalMaterial color="#edaf51" metalness={.12} roughness={.15} transmission={.65} thickness={.45} transparent opacity={.85} ior={1.45} />}
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
  return <Canvas aria-hidden="true" frameloop="demand" dpr={[1, 1.5]} camera={{ position: [5.6, 4.2, 7.5], fov: 35 }} gl={{ antialias: true, alpha: false, powerPreference: 'low-power' }}>
    <color attach="background" args={['#110f0e']} />
    <ambientLight intensity={.4} />
    <spotLight position={[2, 5, 2]} intensity={55} angle={.6} penumbra={1} color="#ffce8a" />
    <Environment resolution={128} frames={1}>
      <Lightformer form="rect" intensity={4} position={[0, 5, -1]} rotation-x={Math.PI / 2} scale={[6, 4, 1]} color="#fff3df" />
      <Lightformer form="rect" intensity={3} position={[-5, 1, 0]} rotation-y={Math.PI / 2} scale={[3, 6, 1]} color="#ecab4d" />
      <Lightformer form="rect" intensity={2} position={[3, 1, 4]} rotation-y={Math.PI} scale={[4, 3, 1]} color="#fff8ec" />
    </Environment>
    <Layers />
    <mesh rotation-x={-Math.PI / 2} position={[0, -1.8, 0]}><planeGeometry args={[30, 30]} /><meshStandardMaterial color="#15120f" metalness={.6} roughness={.35} /></mesh>
    <Lifecycle {...props} />
  </Canvas>;
}
