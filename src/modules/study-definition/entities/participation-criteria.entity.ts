import { BaseEntity } from "@/database/entities/base.entity";
import { Entity, Enum, ManyToOne, Property } from "@mikro-orm/core";

import { Study } from "./study.entity";
import { GroupingType } from "../enum/grouping-type";
import { CriteriaType } from "../enum/criteria-type";

@Entity()
export class ParticipationCriterion extends BaseEntity {
  @ManyToOne(() => Study)
  study: Study;

  @Enum(() => CriteriaType)
  type: CriteriaType;

  @Property()
  value: string;

  @Property({ nullable: true })
  @Enum(() => GroupingType)
  grouping?: GroupingType;

  @ManyToOne(() => ParticipationCriterion, { nullable: true })
  parent?: ParticipationCriterion;
}
