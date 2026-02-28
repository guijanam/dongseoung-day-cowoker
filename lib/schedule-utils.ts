import { Worker } from "./types";

export function formatPhoneNumber(num: string | null): string {
  if (!num) return "";
  const cleaned = ("" + num).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return num;
}

export function getRawPhone(num: string | null): string {
  if (!num) return "";
  return ("" + num).replace(/\D/g, "");
}

export function turnSort(a: Worker, b: Worker): number {
  const getDetails = (t: string): [number, number] => [
    t.startsWith("휴") ? 3 : t.startsWith("대") ? 2 : 1,
    parseInt(t.match(/\d+/)?.[0] || "999"),
  ];
  const [cA, vA] = getDetails(a.turn);
  const [cB, vB] = getDetails(b.turn);
  const tildeA = a.turn.includes("~") ? 1 : 0;
  const tildeB = b.turn.includes("~") ? 1 : 0;
  if (tildeA !== tildeB) return tildeA - tildeB;
  if (cA !== cB) return cA - cB;
  return vA - vB;
}

const HOLIDAY_TURNS = ["31", "32", "33", "34", "35", "36", "37"];

export function getTurnBgClass(turn: string, dateStr: string, isHoliday = false): string {
  const dayOfWeek = new Date(dateStr).getDay();
  const isHolidayDay = dayOfWeek === 0 || dayOfWeek === 6 || isHoliday;

  if (turn.includes("~")) return "turn-range";
  if (turn.startsWith("휴") || (isHolidayDay && HOLIDAY_TURNS.includes(turn)))
    return "turn-holiday";
  if (turn.startsWith("대")) return "turn-substitute";
  return "";
}

export function getTodayDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export const DAY_NAMES = ["일", "월", "화", "수", "목", "금", "토"] as const;

export function getDayOfWeek(dateStr: string): {
  name: string;
  colorClass: string;
} {
  const idx = new Date(dateStr).getDay();
  const name = DAY_NAMES[idx];
  const colorClass =
    idx === 0
      ? "text-red-500"
      : idx === 6
        ? "text-blue-500"
        : "text-foreground";
  return { name, colorClass };
}

export function extractDiaId(turn: string): string | null {
  if (turn.startsWith("휴") || turn.startsWith("대")) return null;
  const numMatch = turn.match(/\d+/);
  return numMatch ? numMatch[0] : null;
}

function getDayType(dateStr: string, isHoliday: boolean): string {
  const day = new Date(dateStr).getDay();
  if (day === 0 || isHoliday) return "휴";
  if (day === 6) return "토";
  return "평";
}

export function getTypeName(dateStr: string, isHoliday = false): string {
  const type = getDayType(dateStr, isHoliday);
  if (type === "휴") return "휴일";
  if (type === "토") return "토";
  return "평일";
}

export function getComboTypeName(
  dateStr: string,
  isHoliday: boolean,
  isNextHoliday: boolean
): string {
  const nextDate = new Date(dateStr);
  nextDate.setDate(nextDate.getDate() + 1);
  const nextDateStr = nextDate.toISOString().slice(0, 10);

  const currType = getDayType(dateStr, isHoliday);
  const nextType = getDayType(nextDateStr, isNextHoliday);
  return currType + nextType;
}

export function getNextDateStr(dateStr: string): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export function extractOfficeName(patternName: string): string {
  const match = patternName.match(/^(.+?)[\(（]/);
  return match ? match[1] : patternName;
}
