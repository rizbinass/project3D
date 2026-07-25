"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { RoomGLB } from "./RoomGLB";
import { SceneLighting } from "./SceneLighting";
import { Background } from "./Background";

export function RoomScene() {
  return (
    <div className="h-dvh w-full">
      <Canvas camera={{ position: [3, 2, 5], fov: 45 }}>
        <color attach="background" args={["#87CEEB"]} />
        <Background />
        <SceneLighting />
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
