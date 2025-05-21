import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class ComponentDefinition {
  @PrimaryKey()
  componentDefinitionId: string;

  @Property()
  schemaVersion: string;

  @Property()
  type: string;

  @Property()
  title: string;

  @Property({ type: "json" })
  schema: Record<string, any>;

  @Property()
  createdAt: Date = new Date();

  @Property()
  updatedAt: Date = new Date();
}
