import { Entity, PrimaryKey, ManyToOne, Property, Enum } from "@mikro-orm/core";
import { StudyDefinition } from "./study-definition.entity";
import { ParticipationCriteriaType } from "../enum/participation-criteria-type";

@Entity()
export class ParticipationCriteria {
  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  id: string;

  @ManyToOne(() => StudyDefinition)
  studyDefinition: StudyDefinition;

  @Enum(() => ParticipationCriteriaType)
  type: ParticipationCriteriaType;

  @Property()
  value: string;
}
