import { ParticipationCriteriaType } from "../../enum/participation-criteria-type";

export class CreateParticipationCriteriaDto {
  studyDefinition: string;
  type: ParticipationCriteriaType;
  value: string;
}
