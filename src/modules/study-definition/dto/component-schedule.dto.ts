export class ComponentScheduleDto {
  completionPolicy: string;
  startOffsetDays: number;
  repeatMetadata?: RepeatMetadata;
}

export type RepeatMetadata = {
  type: "daily" | "weekly";
  hour: number;
  minute: number;
  interval: number;
  weekday?: string;
};
