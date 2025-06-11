import { GetComponentInstanceDto } from "./get-component-instance.dto";
import { EnrollmentConditionDto } from "./enrollment-condition.dto";
import { ParticipationCriteriaDto } from "./participation-criteria.dto";

export class GetStudyDefinitionDto {
  id: string;
  schemaVersion: string;
  title: string;
  shortTitle: string;
  explanationText: string;
  shortExplanationText: string;
  iconSymbol: string;
  enrollmentCondition?: EnrollmentConditionDto;
  participationCriteria?: ParticipationCriteriaDto[];
  components: GetComponentInstanceDto[];
}
