import { ParticipationCriteria } from "./participation-criteria.entity";
import { ParticipationCriteriaDto } from "./dto/participation-criteria.dto";

export class ParticipationCriteriaMapper {
  static toDto(entity: ParticipationCriteria): ParticipationCriteriaDto {
    return {
      id: entity.id,
      studyDefinition: entity.studyDefinition.id,
      type: entity.type,
      value: entity.value,
    };
  }
}
