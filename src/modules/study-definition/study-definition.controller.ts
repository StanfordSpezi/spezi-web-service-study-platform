// This source file is part of the Stanford Spezi open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT

import { Body, Controller, Post } from "@nestjs/common";
import { StudyDefinitionService } from "./study-definition.service";
import { CreateStudyDefinitionDto } from "./dto/create-study-definition.dto";

@Controller("study-definition")
export class StudyDefinitionController {
  constructor(
    private readonly studyDefinitionService: StudyDefinitionService,
  ) {}

  @Post()
  async create(@Body() dto: CreateStudyDefinitionDto) {
    return this.studyDefinitionService.create(dto);
  }
}
