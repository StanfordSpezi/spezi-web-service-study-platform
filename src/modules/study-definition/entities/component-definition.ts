import { Entity, Enum, PrimaryKey, Property } from "@mikro-orm/core";
import { ComponentType } from "../enum/component-type";

@Entity()
export class ComponentDefinition {
  @PrimaryKey()
  componentDefinitionId: string;

  @Property()
  schemaVersion: string;

  @Enum(() => ComponentType)
  type: ComponentType;

  @Property()
  title: string;

  @Property({ type: "json" })
  schema: Record<string, any>;

  @Property()
  createdAt: Date = new Date();

  @Property()
  updatedAt: Date = new Date();
}
