export interface TimeRange {
  from: string; // "09:00"
  to: string;   // "12:00"
}

export interface Availability {
  _id?: string;
  weekday: number; // 0 = Domingo, ...
  timeRanges: TimeRange[];
}
