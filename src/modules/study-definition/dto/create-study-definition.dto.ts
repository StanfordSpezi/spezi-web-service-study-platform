import { CreateComponentInstanceDto } from "./create-component-instance.dto";
import { CreateEnrollmentConditionDto } from "./create-enrollment-condition.dto";
import { CreateParticipationCriteriaDto } from "./create-participation-criteria.dto";

export class CreateStudyDefinitionDto {
  schemaVersion: string;
  title: string;
  shortTitle: string;
  explanationText: string;
  shortExplanationText: string;
  iconSymbol: string;
  enrollmentCondition?: CreateEnrollmentConditionDto;
  participationCriteria?: CreateParticipationCriteriaDto[];
  components: CreateComponentInstanceDto[];
}
