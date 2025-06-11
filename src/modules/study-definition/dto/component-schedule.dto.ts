export class ComponentScheduleDto {
  completionPolicy: string;
  startOffsetDays: number;
  repeatMetadata?: {
    type: "daily" | "weekly";
    hour: number;
    minute: number;
    interval: number;
    weekday?: string;
  };
}
