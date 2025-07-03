import { PartialType } from "@nestjs/mapped-types";
import { CreateComponentDefinitionDto } from "./create-component-definiton.dto";

export class UpdateComponentDefinitionDto extends PartialType(
  CreateComponentDefinitionDto,
) {}
