import { PartialType } from "@nestjs/mapped-types";
import { CreateComponentInstanceDto } from "./create-component-instance.dto";

export class UpdateComponentInstanceDto extends PartialType(
  CreateComponentInstanceDto,
) {}
