import { PartialType } from "@nestjs/mapped-types";
import { CreateEnrollmentConditionDto } from "./create-enrollment-condition.dto";

export class UpdateEnrollmentConditionDto extends PartialType(
  CreateEnrollmentConditionDto,
) {}
