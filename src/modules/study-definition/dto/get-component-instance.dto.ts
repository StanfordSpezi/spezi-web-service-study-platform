import { HealthDataCollectionSchema } from "@/types/health-data-collection-schema.dto";
import { ComponentScheduleDto } from "./component-schedule.dto";
import { ApiExtraModels, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { QuestionnaireSchema } from "@/types/questionnaire-schema.dto";
import { InformationalSchema } from "@/types/informational-schema.dto";

@ApiExtraModels(
  HealthDataCollectionSchema,
  QuestionnaireSchema,
  InformationalSchema,
)
export class GetComponentInstanceDto {
  id: string;
  componentDefinitionId: string;
  displayOrder: number;
  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(HealthDataCollectionSchema) },
      { $ref: getSchemaPath(QuestionnaireSchema) },
      { $ref: getSchemaPath(InformationalSchema) },
    ],
    description: "Instance-specific config schema, based on component `type`",
  })
  details: Record<string, any>;
  schedule?: ComponentScheduleDto;
  componentDefinition?: {
    id: string;
    title: string;
    type: string;
    schemaVersion: string;
  };
}
