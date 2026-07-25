"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { RoomGLB } from "./RoomGLB";

export function RoomScene() {
  return (
    <div className="h-dvh w-full">
      <Canvas camera={{ position: [3, 2, 5], fov: 45 }}>
        <color attach="background" args={["#080c12"]} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <rectAreaLight
          position={[0, 2.2, 0.5]}
          width={1.5}
          height={0.1}
          intensity={5}
          color="#ffe4c4"
        />
        <Suspense fallback={null}>
          <RoomGLB />
        </Suspense>
        <OrbitControls
          enableDamping
          dampingFactor={0.08}
          minDistance={1.5}
          maxDistance={12}
          minPolarAngle={Math.PI / 8}
          maxPolarAngle={Math.PI / 2.05}
        />
      </Canvas>
    </div>
  );
}
