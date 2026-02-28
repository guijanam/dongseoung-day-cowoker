"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DAY_NAMES, getDayOfWeek } from "@/lib/schedule-utils";

interface HeaderControlsProps {
  currentDate: string;
  onDateChange: (date: string) => void;
  holidayName?: string;
}

export function HeaderControls({
  currentDate,
  onDateChange,
  holidayName,
}: HeaderControlsProps) {
  const { theme, setTheme } = useTheme();
  const [now, setNow] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dayInfo = getDayOfWeek(currentDate);

  const formatTime = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayName = DAY_NAMES[date.getDay()];
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${month}월 ${day}일(${dayName}) ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="mb-2 space-y-2">
      <div className="flex items-center justify-center gap-2 text-sm font-bold">
        <span>{mounted && now ? formatTime(now) : "\u00A0"}</span>
        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Moon className="h-3.5 w-3.5" />
            ) : (
              <Sun className="h-3.5 w-3.5" />
            )}
          </Button>
        )}
      </div>

      <div className="flex items-center justify-center gap-3">
        <div className="flex items-center gap-2">
          <Input
            type="date"
            value={currentDate}
            onChange={(e) => e.target.value && onDateChange(e.target.value)}
            className="h-8 w-[140px] text-sm"
          />
          <span className={`min-w-[24px] text-sm font-bold ${dayInfo.colorClass}`}>
            {dayInfo.name}
          </span>
          {holidayName && (
            <span className="text-sm font-bold text-red-500">
              {holidayName}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
