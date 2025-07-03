import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { StudyDefinition } from "../study-definition/study-definition.entity";
import { ComponentDefinition } from "../component-definition/component-definition.entity";
import { ComponentSchedule } from "../component-schedule/component-schedule.entity";

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
    mappedBy: "componentInstance",
  })
  schedule?: ComponentSchedule;
}
