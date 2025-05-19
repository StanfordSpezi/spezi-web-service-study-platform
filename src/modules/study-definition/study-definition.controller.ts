// This source file is part of the Stanford Spezi open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT

import { Controller } from "@nestjs/common";
import { StudyDefinitionService } from "./study-definition.service";

@Controller("study-definition")
export class StudyDefinitionController {
  constructor(
    private readonly studyDefinitionService: StudyDefinitionService,
  ) {}
}
