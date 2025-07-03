import { PartialType } from "@nestjs/mapped-types";
import { CreateComponentScheduleDto } from "./create-component-schedule.dto";

export class UpdateComponentScheduleDto extends PartialType(
  CreateComponentScheduleDto,
) {}
