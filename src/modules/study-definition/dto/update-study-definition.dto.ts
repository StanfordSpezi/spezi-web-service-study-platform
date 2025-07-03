import { PartialType } from "@nestjs/mapped-types";
import { CreateStudyDefinitionDto } from "./create-study-definition.dto";

export class UpdateStudyDefinitionDto extends PartialType(
  CreateStudyDefinitionDto,
) {}
