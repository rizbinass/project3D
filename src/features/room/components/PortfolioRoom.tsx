"use client";

import { RoomBootOverlay } from "./RoomBootOverlay";
import { RoomCanvas } from "./RoomCanvas";
import { PortfolioOverlay } from "./PortfolioOverlay";
import { useRoomBoot } from "@/features/room/hooks/useRoomBoot";
import { useSceneQuality } from "@/features/room/hooks/useSceneQuality";

export function PortfolioRoom() {
  useSceneQuality();
  const ready = useRoomBoot();

  return (
    <main className="bg-background text-text-primary relative h-dvh w-full overflow-hidden">
      <RoomCanvas />
      <RoomBootOverlay visible={!ready} />
      <PortfolioOverlay />
    </main>
  );
}
