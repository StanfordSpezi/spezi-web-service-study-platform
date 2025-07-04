import { StudyDefinition } from "./study-definition.entity";
import { StudyDefinitionDto } from "./dto/study-definition.dto";

export class StudyDefinitionMapper {
  static toDto(entity: StudyDefinition): StudyDefinitionDto {
    return {
      id: entity.id,
      schemaVersion: entity.schemaVersion,
      title: entity.title,
      shortTitle: entity.shortTitle,
      explanationText: entity.explanationText,
      shortExplanationText: entity.shortExplanationText,
      iconSymbol: entity.iconSymbol,
    };
  }
}
