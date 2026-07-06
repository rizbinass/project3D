"use client";

import { Html, useTexture } from "@react-three/drei";
import { useEffect } from "react";
import { SRGBColorSpace } from "three";
import { Button } from "@/components/ui";
import { monitorSceneSections, photoPlaceholders } from "@/features/room/data/room-glb.data";
import { useSceneStore } from "@/store/useSceneStore";

function MonitorDesktop() {
  const closeExperience = useSceneStore((state) => state.setActiveExperience);

  return (
    <Html
      transform
      occlude
      distanceFactor={1.15}
      position={[-0.02, 1.9, 1.73]}
      rotation={[0, 0, 0]}
      className="pointer-events-auto"
    >
      <div className="h-[360px] w-[620px] overflow-hidden rounded-[26px] border border-white/20 bg-[radial-gradient(circle_at_top_left,_rgba(103,232,249,0.26),_transparent_36%),linear-gradient(180deg,_rgba(13,27,54,0.98),_rgba(4,8,22,0.98))] text-white shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
        <div className="flex h-12 items-center justify-between border-b border-white/10 bg-white/6 px-4 text-[13px] backdrop-blur-xl">
          <span className="font-medium tracking-[0.18em] text-cyan-100/90">WINDOWS 11</span>
          <Button
            size="sm"
            variant="glass"
            className="h-8 px-3 text-xs"
            onClick={() => closeExperience(null)}
          >
            Close
          </Button>
        </div>
        <div className="grid h-[calc(100%-48px)] grid-cols-[1fr_220px] gap-0">
          <div className="grid content-start gap-4 p-5">
            <div>
              <p className="text-[11px] tracking-[0.26em] text-cyan-100/60 uppercase">Desktop</p>
              <h3 className="mt-1 text-2xl font-semibold">Portfolio Workspace</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {monitorSceneSections.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/6 p-3 text-center text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                >
                  <div className="mx-auto mb-3 h-11 w-11 rounded-xl bg-cyan-300/18" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="border-l border-white/10 bg-black/18 p-5">
            <p className="text-[11px] tracking-[0.24em] text-white/50 uppercase">Status</p>
            <div className="mt-3 rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-4">
              <p className="text-sm text-cyan-50">System boot complete.</p>
              <p className="mt-2 text-xs text-cyan-100/70">Applications are visual-only for now.</p>
            </div>
          </div>
        </div>
      </div>
    </Html>
  );
}

function PhotoViewer() {
  const texture = useTexture(photoPlaceholders[1]);
  const activeExperience = useSceneStore((state) => state.activeExperience);

  useEffect(() => {
    texture.colorSpace = SRGBColorSpace;
    texture.needsUpdate = true;
  }, [texture]);

  if (activeExperience !== "photo") {
    return null;
  }

  return (
    <group position={[-2.92, 1.8, 2.82]}>
      <mesh>
        <planeGeometry args={[1.28, 0.84]} />
        <meshStandardMaterial color="#24160f" metalness={0.12} roughness={0.78} />
      </mesh>
      <mesh position={[0, 0, 0.012]}>
        <planeGeometry args={[1.12, 0.68]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  );
}

export function RoomDisplaySurfaces() {
  const activeExperience = useSceneStore((state) => state.activeExperience);

  return (
    <>
      {activeExperience === "monitor" ? <MonitorDesktop /> : null}
      <PhotoViewer />
    </>
  );
}
