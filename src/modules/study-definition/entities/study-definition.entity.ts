import {
  Collection,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { ComponentInstance } from "./component-instance";
import { EnrollmentCondition } from "./enrollment-condition";
import { ParticipationCriterion } from "./participation-criterion";

@Entity()
export class StudyDefinition {
  @PrimaryKey()
  studyDefinitionId: string;

  @Property()
  schemaVersion: string;

  @Property()
  title: string;

  @Property()
  shortTitle: string;

  @Property()
  explanationText: string;

  @Property()
  shortExplanationText: string;

  @Property()
  iconSymbol: string;

  @OneToOne(
    () => EnrollmentCondition,
    (condition) => condition.studyDefinition,
    { nullable: true },
  )
  enrollmentCondition?: EnrollmentCondition;

  @OneToMany(
    () => ParticipationCriterion,
    (criterion) => criterion.studyDefinition,
  )
  participationCriteria = new Collection<ParticipationCriterion>(this);

  @OneToMany(() => ComponentInstance, (instance) => instance.studyDefinition)
  componentInstances = new Collection<ComponentInstance>(this);
}
