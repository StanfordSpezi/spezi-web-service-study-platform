// This source file is part of the Stanford Spezi open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT

import { Module } from "@nestjs/common";
import { StudyDefinitionController } from "./study-definition.controller";
import { StudyDefinitionService } from "./study-definition.service";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { StudyDefinition } from "./study-definition.entity";

@Module({
  imports: [MikroOrmModule.forFeature([StudyDefinition])],
  providers: [StudyDefinitionService],
  controllers: [StudyDefinitionController],
})
export class StudyDefinitionModule {}
