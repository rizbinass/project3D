"use client";

import { Html } from "@react-three/drei";
import { Button } from "@/components/ui";
import { useRoomObjectInteraction } from "@/features/room/hooks/useRoomObjectInteraction";
import { useSceneStore } from "@/store/useSceneStore";

export function RoomInteractionLayer() {
  const activeExperience = useSceneStore((state) => state.activeExperience);
  const focusedObjectId = useSceneStore((state) => state.focusedObjectId);
  const { closeActiveExperience } = useRoomObjectInteraction();

  if (!activeExperience && focusedObjectId !== "lamp") {
    return null;
  }

  return (
    <Html fullscreen className="pointer-events-none">
      <div className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center px-4">
        {activeExperience ? (
          <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-white/10 bg-black/45 px-4 py-2 text-sm text-white backdrop-blur-xl">
            <span>
              {activeExperience === "monitor" ? "Monitor session active" : "Photo focus active"}
            </span>
            <Button size="sm" variant="glass" onClick={closeActiveExperience}>
              Return
            </Button>
          </div>
        ) : focusedObjectId === "lamp" ? (
          <div className="rounded-full border border-white/10 bg-black/35 px-4 py-2 text-sm text-white/85 backdrop-blur-xl">
            Toggling day and night
          </div>
        ) : null}
      </div>
    </Html>
  );
}
