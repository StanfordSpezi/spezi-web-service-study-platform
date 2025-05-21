import { Entity, Enum, PrimaryKey, Property, Unique } from "@mikro-orm/core";
import { ComponentType } from "../enum/component-type";

@Entity()
@Unique({ properties: ["type", "schemaVersion"] })
export class ComponentDefinition {
  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  id: string;

  @Enum(() => ComponentType)
  type: ComponentType;

  @Property()
  schemaVersion: string;

  @Property()
  title: string;

  @Property({ type: "json" })
  schema: Record<string, any>;

  @Property()
  createdAt: Date = new Date();

  @Property()
  updatedAt: Date = new Date();
}
