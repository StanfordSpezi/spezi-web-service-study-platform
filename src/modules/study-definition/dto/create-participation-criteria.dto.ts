import { GroupingType } from "../enum/grouping-type";
import { ParticipationCriteriaType } from "../enum/participation-criteria-type";

export class CreateParticipationCriteriaDto {
  type: ParticipationCriteriaType;
  value: string;
  grouping?: GroupingType;
  parentId?: string;
}
