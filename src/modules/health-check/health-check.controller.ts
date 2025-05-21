// This source file is part of the Stanford Spezi open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT

import { Controller, Get } from "@nestjs/common";
import { HealthCheckService } from "./health-check.service";

@Controller("health")
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get()
  checkHealth(): { status: string; uptime: number; timestamp: string } {
    return this.healthCheckService.getHealthStatus();
  }
}
