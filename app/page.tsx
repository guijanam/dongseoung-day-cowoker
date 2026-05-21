import { Suspense } from "react";
import { ScheduleApp } from "@/components/schedule-app";

export default function Home() {
  return (
    <Suspense fallback={null}>
      <ScheduleApp />
    </Suspense>
  );
}
