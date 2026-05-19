export interface Worker {
  name: string;
  phone_number: string | null;
  turn: string;
  staff_position: string;
  pattern_name: string;
  leave?: boolean;   // 휴직(병가/육아 등) 여부
}

export interface DiaInfo {
  dia_id: string;
  office_name: string;
  type_name: string;
  work_time: string;
  first_time: string;
  second_time: string;
  num_tr1: string;
  num_tr2: string;
}

export interface DiaDetail {
  type_name: string;
  work_time: string;
  first_time: string;
  second_time: string;
  num_tr1: string;
  num_tr2: string;
}

export type TabType = "기관사" | "차장";
