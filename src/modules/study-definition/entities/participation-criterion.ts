import { Entity, PrimaryKey, ManyToOne, Property } from "@mikro-orm/core";
import { StudyDefinition } from "./study-definition.entity";

@Entity()
export class ParticipationCriterion {
  @PrimaryKey()
  criterionId: string;

  @ManyToOne(() => StudyDefinition)
  studyDefinition: StudyDefinition;

  @Property()
  type: string;

  @Property()
  value: string;

  @Property({ nullable: true })
  grouping?: string;

  @ManyToOne(() => ParticipationCriterion, { nullable: true })
  parent?: ParticipationCriterion;
}
