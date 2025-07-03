import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { ComponentInstance } from "./component-instance.entity";
import { ComponentInstanceService } from "./component-instance.service";
import { ComponentInstanceController } from "./component-instance.controller";

@Module({
  imports: [MikroOrmModule.forFeature([ComponentInstance])],
  providers: [ComponentInstanceService],
  controllers: [ComponentInstanceController],
})
export class ComponentInstanceModule {}
