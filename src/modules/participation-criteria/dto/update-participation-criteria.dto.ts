import { PartialType } from "@nestjs/mapped-types";
import { CreateParticipationCriteriaDto } from "./create-participation-criteria.dto";

export class UpdateParticipationCriteriaDto extends PartialType(
  CreateParticipationCriteriaDto,
) {}
