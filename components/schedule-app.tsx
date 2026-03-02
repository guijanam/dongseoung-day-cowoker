"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { Worker, DiaInfo, DiaDetail, TabType } from "@/lib/types";
import { getTodayDate, turnSort, getTypeName, getComboTypeName, getNextDateStr, extractDiaId, extractOfficeName } from "@/lib/schedule-utils";
import { HeaderControls } from "./header-controls";
import { SearchBar } from "./search-bar";
import { WorkerList } from "./worker-list";
import { BottomTabs } from "./bottom-tabs";

export function ScheduleApp() {
  const [currentDate, setCurrentDate] = useState(getTodayDate);
  const [selectedTab, setSelectedTab] = useState<TabType>("기관사");
  const [allDataForDay, setAllDataForDay] = useState<Worker[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [diaMap, setDiaMap] = useState<Map<string, DiaDetail>>(new Map());
  const [isHoliday, setIsHoliday] = useState(false);
  const [holidayName, setHolidayName] = useState("");

  const fetchWorkers = useCallback(async (date: string) => {
    setIsLoading(true);
    try {
      const nextDate = getNextDateStr(date);
      const [scheduleResult, diaResult, holidayResult, nextHolidayResult] = await Promise.all([
        supabase.rpc("get_schedule_by_range", {
          p_start_date: date,
          p_end_date: date,
        }),
        supabase
          .from("dia")
          .select("dia_id, office_name, type_name, work_time, first_time, second_time, num_tr1, num_tr2"),
        supabase
          .from("holidays")
          .select("locdate, date_name")
          .eq("locdate", date)
          .eq("is_holiday", "Y"),
        supabase
          .from("holidays")
          .select("locdate")
          .eq("locdate", nextDate)
          .eq("is_holiday", "Y"),
      ]);

      if (scheduleResult.error) throw scheduleResult.error;
      setAllDataForDay((scheduleResult.data as Worker[]) || []);

      const holiday = !holidayResult.error && (holidayResult.data?.length ?? 0) > 0;
      setIsHoliday(holiday);
      setHolidayName(holiday ? holidayResult.data![0].date_name : "");

      const isNextHoliday = !nextHolidayResult.error && (nextHolidayResult.data?.length ?? 0) > 0;

      if (!diaResult.error && diaResult.data) {
        const map = new Map<string, DiaDetail>();
        const typeName = getTypeName(date, holiday);
        const comboTypeName = getComboTypeName(date, holiday, isNextHoliday);
        for (const dia of diaResult.data as DiaInfo[]) {
          if (dia.type_name === typeName || dia.type_name === comboTypeName) {
            map.set(`${dia.office_name}_${dia.dia_id}`, {
              type_name: dia.type_name || "",
              work_time: dia.work_time || "",
              first_time: dia.first_time || "",
              second_time: dia.second_time || "",
              num_tr1: dia.num_tr1 || "",
              num_tr2: dia.num_tr2 || "",
            });
          }
        }
        setDiaMap(map);
      }
    } catch {
      toast.error("데이터 로딩 실패");
      setAllDataForDay([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkers(currentDate);
  }, [currentDate, fetchWorkers]);

  const filteredWorkers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return allDataForDay
      .filter(
        (w) =>
          w.staff_position?.trim() === selectedTab &&
          w.name.toLowerCase().includes(query)
      )
      .sort(turnSort);
  }, [allDataForDay, selectedTab, searchQuery]);

  return (
    <div className="mx-auto flex h-dvh max-w-[500px] flex-col px-2 pt-2">
      <HeaderControls currentDate={currentDate} onDateChange={setCurrentDate} holidayName={holidayName} />
      <SearchBar onChange={setSearchQuery} />
      <WorkerList
        workers={filteredWorkers}
        isLoading={isLoading}
        currentDate={currentDate}
        diaMap={diaMap}
        isHoliday={isHoliday}
      />
      <BottomTabs selectedTab={selectedTab} onTabChange={setSelectedTab} />
    </div>
  );
}
