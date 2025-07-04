import { ComponentType } from "@/modules/enum/component-type";

export class ComponentDefinitionDto {
  id: string;
  type: ComponentType;
  schemaVersion: string;
  title: string;
  schema: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
