import { ParticipationCriteriaType } from "../../enum/participation-criteria-type";

export class ParticipationCriteriaDto {
  id: string;
  studyDefinition: string;
  type: ParticipationCriteriaType;
  value: string;
}
