import {
  Collection,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { ComponentInstance } from "./component-instance.entity";
import { EnrollmentCondition } from "./enrollment-condition.entity";
import { ParticipationCriteria } from "./participation-criteria.entity";

@Entity()
export class StudyDefinition {
  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  id: string;

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
    () => ParticipationCriteria,
    (criterion) => criterion.studyDefinition,
  )
  participationCriteria = new Collection<ParticipationCriteria>(this);

  @OneToMany(() => ComponentInstance, (instance) => instance.studyDefinition)
  componentInstances = new Collection<ComponentInstance>(this);
}
