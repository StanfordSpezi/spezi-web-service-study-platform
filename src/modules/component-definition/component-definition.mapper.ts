import { ComponentDefinitionDto } from "./dto/component-definition.dto";
import { ComponentDefinition } from "./component-definition.entity";

export class ComponentDefinitionMapper {
  static toDto(entity: ComponentDefinition): ComponentDefinitionDto {
    return {
      id: entity.id,
      type: entity.type,
      schemaVersion: entity.schemaVersion,
      title: entity.title,
      schema: entity.schema,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
