import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { ComponentDefinition } from "./component-definition.entity";
import { ComponentDefinitionService } from "./component-definition.service";
import { ComponentDefinitionController } from "./component-definition.controller";

@Module({
  imports: [MikroOrmModule.forFeature([ComponentDefinition])],
  providers: [ComponentDefinitionService],
  controllers: [ComponentDefinitionController],
})
export class ComponentDefinitionModule {}
