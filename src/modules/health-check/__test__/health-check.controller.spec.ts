// This source file is part of the Stanford Spezi open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT

import { Test, type TestingModule } from "@nestjs/testing";
import { HealthCheckController } from "../health-check.controller";
import { HealthCheckService } from "../health-check.service";

describe("HealthCheckController", () => {
  let controller: HealthCheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      providers: [HealthCheckService],
    }).compile();

    controller = module.get<HealthCheckController>(HealthCheckController);
  });

  it("should return health status", () => {
    expect(controller.checkHealth()).toHaveProperty("status", "OK");
  });
});
