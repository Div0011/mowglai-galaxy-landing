"use client";

import dynamic from "next/dynamic";

const SmartCompanion = dynamic(() => import("./InteractiveCompanion"), {
  ssr: false,
});

export default function ClientCompanion() {
  return <SmartCompanion />;
}
