import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { EnrollmentCondition } from "./enrollment-condition.entity";
import { EnrollmentConditionService } from "./enrollment-condition.service";
import { EnrollmentConditionController } from "./enrollment-condition.controller";

@Module({
  imports: [MikroOrmModule.forFeature([EnrollmentCondition])],
  providers: [EnrollmentConditionService],
  controllers: [EnrollmentConditionController],
})
export class EnrollmentConditionModule {}
