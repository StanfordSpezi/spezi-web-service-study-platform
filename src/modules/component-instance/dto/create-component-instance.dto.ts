export class CreateComponentInstanceDto {
  studyDefinitionId: string;
  componentDefinitionId: string;
  details: Record<string, any>;
  displayOrder: number;
}
