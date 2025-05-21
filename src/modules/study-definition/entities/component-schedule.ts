import { Entity, PrimaryKey, OneToOne, Property } from "@mikro-orm/core";
import { ComponentInstance } from "./component-instance";

@Entity()
export class ComponentSchedule {
  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  id: string;

  @OneToOne(() => ComponentInstance)
  componentInstance: ComponentInstance;

  @Property()
  completionPolicy: string;

  @Property()
  startOffsetDays: number;

  @Property({ type: "json" })
  repeatMetadata: Record<string, any>;
}
