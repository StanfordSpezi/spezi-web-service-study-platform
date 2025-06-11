// This source file is part of the Stanford Spezi open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT

import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from "@nestjs/common";
import { StudyDefinitionService } from "./study-definition.service";
import { CreateStudyDefinitionDto } from "./dto/create-study-definition.dto";
import {
  ApiParam,
  ApiOkResponse,
  ApiBody,
  ApiCreatedResponse,
} from "@nestjs/swagger";
import { GetStudyDefinitionDto } from "./dto/get-study-definition.dto";

@Controller("study-definition")
export class StudyDefinitionController {
  constructor(
    private readonly studyDefinitionService: StudyDefinitionService,
  ) {}

  @Get(":id")
  @ApiParam({ name: "id", description: "StudyDefinition UUID" })
  @ApiOkResponse({
    description:
      "Returns a full study definition with components and metadata.",
    type: GetStudyDefinitionDto,
  })
  async getById(
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
  ): Promise<GetStudyDefinitionDto> {
    return this.studyDefinitionService.getById(id);
  }

  @Post()
  @ApiBody({
    description:
      "Create a new study definition with components, criteria, and optional enrollment conditions.",
    type: CreateStudyDefinitionDto,
  })
  @ApiCreatedResponse({
    description: "The study was successfully created.",
    schema: {
      example: {
        id: "dc58628c-b92f-4c3e-b8d1-798f01fa8e2e",
      },
    },
  })
  async create(@Body() dto: CreateStudyDefinitionDto): Promise<{ id: string }> {
    const id = await this.studyDefinitionService.create(dto);
    return { id };
  }
}
