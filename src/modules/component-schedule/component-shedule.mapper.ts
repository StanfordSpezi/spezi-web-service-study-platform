import { ComponentSchedule } from "./component-schedule.entity";
import { ComponentScheduleDto } from "./dto/component-shedule.dto";
import { RepeatMetadata } from "./dto/create-component-schedule.dto";

export class ComponentScheduleMapper {
  static toDto(entity: ComponentSchedule): ComponentScheduleDto {
    return {
      id: entity.id,
      componentInstance: entity.componentInstance.id,
      completionPolicy: entity.completionPolicy,
      startOffsetDays: entity.startOffsetDays,
      repeatMetadata: entity.repeatMetadata as RepeatMetadata,
    };
  }
}
