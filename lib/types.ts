export interface Worker {
  name: string;
  phone_number: string | null;
  turn: string;
  staff_position: string;
  pattern_name: string;
}

export interface DiaInfo {
  dia_id: string;
  office_name: string;
  type_name: string;
  work_time: string;
  first_time: string;
  second_time: string;
}

export interface DiaDetail {
  type_name: string;
  work_time: string;
  first_time: string;
  second_time: string;
}

export type TabType = "기관사" | "차장";
