import { Entity, PrimaryKey, ManyToOne, Property, Enum } from "@mikro-orm/core";
import { StudyDefinition } from "./study-definition.entity";
import { GroupingType } from "../enum/grouping-type";
import { ParticipationCriteriaType } from "../enum/participation-criteria-type";

@Entity()
export class ParticipationCriterion {
  @PrimaryKey()
  criterionId: string;

  @ManyToOne(() => StudyDefinition)
  studyDefinition: StudyDefinition;

  @Enum(() => ParticipationCriteriaType)
  type: ParticipationCriteriaType;

  @Property()
  value: string;

  @Enum(() => GroupingType)
  @Property({ nullable: true })
  grouping?: GroupingType;

  @ManyToOne(() => ParticipationCriterion, { nullable: true })
  parent?: ParticipationCriterion;
}
