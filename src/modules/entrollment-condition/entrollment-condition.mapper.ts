import { EnrollmentConditionDto } from "./dto/enrollment-criteria.dto";
import { EnrollmentCondition } from "./enrollment-condition.entity";

export class EnrollmentConditionMapper {
  static toDto(entity: EnrollmentCondition): EnrollmentConditionDto {
    return {
      id: entity.id,
      studyDefinition: entity.studyDefinition.id,
      requiresInvite: entity.requiresInvite,
      inviteUrl: entity.inviteUrl,
    };
  }
}
