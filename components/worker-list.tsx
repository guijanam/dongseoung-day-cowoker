"use client";

import { Worker, DiaDetail } from "@/lib/types";
import { WorkerCard } from "./worker-card";
import { Wrench } from "lucide-react";

interface WorkerListProps {
  workers: Worker[];
  isLoading: boolean;
  currentDate: string;
  diaMap: Map<string, DiaDetail>;
  isHoliday: boolean;
  isMaintenance: boolean;
  maintenanceMessage: string;
}

export function WorkerList({ workers, isLoading, currentDate, diaMap, isHoliday, isMaintenance, maintenanceMessage }: WorkerListProps) {
  if (isMaintenance) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3">
        <Wrench className="h-10 w-10 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">
          {maintenanceMessage}
        </span>
        <span className="text-xs text-muted-foreground/60">
          점검이 완료되면 자동으로 복구됩니다.
        </span>
      </div>
    );
  }

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
