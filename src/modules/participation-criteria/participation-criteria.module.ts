import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { ParticipationCriteria } from "./participation-criteria.entity";
import { ParticipationCriteriaService } from "./participation-criteria.service";
import { ParticipationCriteriaController } from "./participation-criteria.controller";

@Module({
  imports: [MikroOrmModule.forFeature([ParticipationCriteria])],
  providers: [ParticipationCriteriaService],
  controllers: [ParticipationCriteriaController],
})
export class ParticipationCriteriaModule {}
