import { ComponentType } from "@/modules/enum/component-type";

export class CreateComponentDefinitionDto {
  type: ComponentType;
  schemaVersion: string;
  title: string;
  schema: Record<string, any>;
}
