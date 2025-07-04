import { RepeatMetadata } from "./create-component-schedule.dto";

export class ComponentScheduleDto {
  id: string;
  componentInstance: string;
  completionPolicy: string;
  startOffsetDays: number;
  repeatMetadata?: RepeatMetadata;
}
