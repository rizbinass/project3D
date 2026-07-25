"use client";

import dynamic from "next/dynamic";

const RoomScene = dynamic(() => import("@/features/room").then((m) => m.RoomScene), { ssr: false });

export default function HomePage() {
  return <RoomScene />;
}
