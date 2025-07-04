export class ComponentInstanceDto {
  id: string;
  studyDefinition: string;
  componentDefinition: string;
  details: Record<string, any>;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}
