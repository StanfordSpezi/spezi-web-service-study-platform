import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { ComponentDefinition } from "./component-definition.entity";
import { ComponentSchedule } from "./component-schedule.entity";
import { StudyDefinition } from "./study-definition.entity";

@Entity()
export class ComponentInstance {
  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  id: string;

  @ManyToOne(() => StudyDefinition)
  studyDefinition: StudyDefinition;

  @ManyToOne(() => ComponentDefinition)
  componentDefinition: ComponentDefinition;

  @Property({ type: "json" })
  details: Record<string, any>;

  @Property()
  displayOrder: number;

  @Property()
  createdAt: Date = new Date();

  @Property()
  updatedAt: Date = new Date();

  @OneToOne(() => ComponentSchedule, (schedule) => schedule.componentInstance, {
    nullable: true,
  })
  schedule?: ComponentSchedule;
}
