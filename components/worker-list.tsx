"use client";

import { Worker, DiaDetail } from "@/lib/types";
import { WorkerCard } from "./worker-card";

interface WorkerListProps {
  workers: Worker[];
  isLoading: boolean;
  currentDate: string;
  diaMap: Map<string, DiaDetail>;
  isHoliday: boolean;
}

export function WorkerList({ workers, isLoading, currentDate, diaMap, isHoliday }: WorkerListProps) {
  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <span className="text-sm text-muted-foreground">로딩 중...</span>
      </div>
    );
  }

  if (workers.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <span className="text-sm text-muted-foreground">
          표시할 데이터가 없습니다.
        </span>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-2 overflow-y-auto pb-16">
      {workers.map((worker, idx) => (
        <WorkerCard
          key={`${worker.name}-${worker.turn}-${idx}`}
          worker={worker}
          currentDate={currentDate}
          diaMap={diaMap}
          isHoliday={isHoliday}
        />
      ))}
    </div>
  );
}
