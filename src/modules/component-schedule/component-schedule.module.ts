import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { ComponentSchedule } from "./component-schedule.entity";
import { ComponentScheduleService } from "./component-schedule.service";
import { ComponentScheduleController } from "./component-schedule.controller";

@Module({
  imports: [MikroOrmModule.forFeature([ComponentSchedule])],
  providers: [ComponentScheduleService],
  controllers: [ComponentScheduleController],
})
export class ComponentScheduleModule {}
