import { useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import type { PerspectiveCamera } from 'three';
import { createWorld } from '../../scene/world';

function Stage({ lite }: { lite: boolean }) {
  const { gl, scene, camera, size, viewport } = useThree();
  const world = useMemo(() => createWorld(gl, scene, camera as PerspectiveCamera, lite), [gl, scene, camera, lite]);
  useEffect(() => () => world.dispose(), [world]);
  useEffect(() => { world.resize(size.width, size.height, viewport.dpr); }, [world, size.width, size.height, viewport.dpr]);
  // Priority 1 hands rendering to the stage's own pass chain.
  useFrame((_, delta) => world.frame(delta), 1);
  return null;
}

export default function StageCanvas({ lite, onLost }: { lite: boolean; onLost: () => void }) {
  return (
    <Canvas
      className="stage-canvas"
      aria-hidden="true"
      dpr={lite ? [1, 1.5] : [1, 1.75]}
      camera={{ fov: 30, position: [0, 0, 10], near: 0.1, far: 60 }}
      gl={{ antialias: false, alpha: false, stencil: false, powerPreference: 'high-performance' }}
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', event => { event.preventDefault(); onLost(); });
      }}
    >
      <Stage lite={lite} />
    </Canvas>
  );
}
