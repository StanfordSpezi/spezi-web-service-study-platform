import { Entity, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { StudyDefinition } from "./study-definition.entity";

@Entity()
export class EnrollmentCondition {
  @PrimaryKey()
  studyDefinitionId: string;

  @OneToOne(() => StudyDefinition)
  studyDefinition: StudyDefinition;

  @Property()
  requiresInvite: boolean;

  @Property({ nullable: true })
  inviteUrl?: string;
}
