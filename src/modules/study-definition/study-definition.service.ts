// This source file is part of the Stanford Spezi open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT

import { Injectable } from "@nestjs/common";
import { CreateStudyDefinitionDto } from "./dto/create-study-definition.dto";

@Injectable()
export class StudyDefinitionService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(_: CreateStudyDefinitionDto): Promise<string> {
    throw new Error("Not implemented");
  }
}
