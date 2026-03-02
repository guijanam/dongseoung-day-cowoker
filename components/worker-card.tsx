"use client";

import { Phone, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Worker, DiaDetail } from "@/lib/types";
import {
  formatPhoneNumber,
  getRawPhone,
  getTurnBgClass,
  extractDiaId,
  extractOfficeName,
} from "@/lib/schedule-utils";

interface WorkerCardProps {
  worker: Worker;
  currentDate: string;
  diaMap: Map<string, DiaDetail>;
  isHoliday: boolean;
}

export function WorkerCard({ worker, currentDate, diaMap, isHoliday }: WorkerCardProps) {
  const rawPhone = getRawPhone(worker.phone_number);
  const displayPhone = formatPhoneNumber(worker.phone_number);
  const turnBgClass = getTurnBgClass(worker.turn, currentDate, isHoliday);

  const diaId = extractDiaId(worker.turn);
  const officeName = extractOfficeName(worker.pattern_name || "");
  const diaDetail = diaId ? diaMap.get(`${officeName}_${diaId}`) : null;

  return (
    <Card
      className={cn(
        "border-0 p-3 shadow-sm",
        turnBgClass
      )}
    >
      <div className="flex flex-col gap-1 text-left">
        <div className="flex items-center gap-2">
          <span className="min-w-[4em] text-base font-bold text-blue-500 dark:text-blue-400">
            {worker.name}
          </span>
          <span className="text-base font-bold">
            {worker.turn}
          </span>
          {diaDetail?.work_time && (
            <span className="text-sm text-muted-foreground">
              {diaDetail.work_time}
            </span>
          )}
          {diaDetail?.type_name && (
            <span className="text-sm text-muted-foreground">
              {diaDetail.type_name}
            </span>
          )}
          <div className="ml-auto flex items-center gap-2">
            {rawPhone ? (
              <>
                <span className="text-xs text-muted-foreground">
                  {displayPhone}
                </span>
                <a
                  href={`tel:${rawPhone}`}
                  className="transition-transform active:scale-110"
                >
                  <Phone className="h-4 w-4 text-green-600" />
                </a>
                <a
                  href={`sms:${rawPhone}`}
                  className="transition-transform active:scale-110"
                >
                  <MessageSquare className="h-4 w-4 text-blue-500" />
                </a>
              </>
            ) : (
              <span className="text-xs text-muted-foreground opacity-30">
                번호없음
              </span>
            )}
          </div>
        </div>
        {diaDetail?.first_time && (
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1">
              <span className="min-w-[9em] text-xs text-muted-foreground">
                {diaDetail.first_time}
              </span>
              {diaDetail.num_tr1 && (
                <span className="text-xs text-muted-foreground">
                  {diaDetail.num_tr1}
                </span>
              )}
            </div>
            {diaDetail.second_time && (
              <div className="flex items-center gap-1">
                <span className="min-w-[9em] text-xs text-muted-foreground">
                  {diaDetail.second_time}
                </span>
                {diaDetail.num_tr2 && (
                  <span className="text-xs text-muted-foreground">
                    {diaDetail.num_tr2}
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
