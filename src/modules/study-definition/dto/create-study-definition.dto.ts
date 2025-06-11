import { CreateComponentInstanceDto } from "./create-component-instance.dto";
import { EnrollmentConditionDto } from "./enrollment-condition.dto";
import { ParticipationCriteriaDto } from "./participation-criteria.dto";

export class CreateStudyDefinitionDto {
  schemaVersion: string;
  title: string;
  shortTitle: string;
  explanationText: string;
  shortExplanationText: string;
  iconSymbol: string;
  enrollmentCondition?: EnrollmentConditionDto;
  participationCriteria?: ParticipationCriteriaDto[];
  components: CreateComponentInstanceDto[];
}
