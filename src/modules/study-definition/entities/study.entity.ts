import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../../database/entities/base.entity";

@Entity()
export class Study extends BaseEntity {
  @Property()
  revision: number;

  @Property()
  schemaVersion: string;

  @Property()
  shortTitle: string;

  @Property()
  title: string;

  @Property({ nullable: true })
  shortExplanationText?: string;

  @Property({ nullable: true })
  explanationText?: string;

  @Property({ nullable: true })
  iconSymbol?: string;
}
