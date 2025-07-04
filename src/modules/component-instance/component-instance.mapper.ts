import { ComponentInstance } from "./component-instance.entity";
import { ComponentInstanceDto } from "./dto/component-instance.dto";

export class ComponentInstanceMapper {
  static toDto(entity: ComponentInstance): ComponentInstanceDto {
    return {
      id: entity.id,
      studyDefinition: entity.studyDefinition.id,
      componentDefinition: entity.componentDefinition.id,
      details: entity.details,
      displayOrder: entity.displayOrder,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
