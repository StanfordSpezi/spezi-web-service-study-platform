// This source file is part of the Stanford Spezi open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT

import { Module } from "@nestjs/common";
import { StudyDefinitionController } from "./study-definition.controller";
import { StudyDefinitionService } from "./study-definition.service";

@Module({
  controllers: [StudyDefinitionController],
  providers: [StudyDefinitionService],
})
export class StudyDefinitionModule {}
