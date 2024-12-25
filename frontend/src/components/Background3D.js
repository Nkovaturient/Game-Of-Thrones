// app/tribute/components/Background3D.jsx
'use client';

import { Canvas } from '@react-three/fiber';
import { useMemo } from 'react';
import * as THREE from 'three';

function Snow() {
  const snowflakes = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20; // Random positions within a range
    }
    return positions;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={snowflakes}
          count={snowflakes.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="white"
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
}

export default function Background3D() {
  return (
    <Canvas className="absolute inset-0">
      <ambientLight intensity={0.5} />
      <Snow />
    </Canvas>
  );
}
