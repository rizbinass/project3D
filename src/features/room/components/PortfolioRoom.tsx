"use client";

import dynamic from "next/dynamic";
import { ClientErrorBoundary } from "@/components/layout/ClientErrorBoundary";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { RoomBootOverlay } from "./RoomBootOverlay";
import { useDeferredMount } from "@/hooks/useDeferredMount";
import { useRoomBoot } from "@/features/room/hooks/useRoomBoot";
import { useSceneQuality } from "@/features/room/hooks/useSceneQuality";

const RoomCanvas = dynamic(() => import("./RoomCanvas").then((module) => module.RoomCanvas), {
  ssr: false,
  loading: () => <LoadingScreen label="Preparing 3D workspace" />,
});

const PortfolioOverlay = dynamic(
  () => import("./PortfolioOverlay").then((module) => module.PortfolioOverlay),
  {
    ssr: false,
  },
);

export function PortfolioRoom() {
  useSceneQuality();
  const ready = useRoomBoot();
  const mountRoomCanvas = useDeferredMount();

  return (
    <main className="bg-background text-text-primary relative h-dvh w-full overflow-hidden">
      <ClientErrorBoundary label="3D workspace" className="z-overlay absolute inset-6">
        {mountRoomCanvas ? <RoomCanvas /> : null}
      </ClientErrorBoundary>
      <RoomBootOverlay visible={!ready || !mountRoomCanvas} />
      <ClientErrorBoundary label="Portfolio panel" resetKey={ready ? "ready" : "booting"}>
        <PortfolioOverlay />
      </ClientErrorBoundary>
    </main>
  );
}
