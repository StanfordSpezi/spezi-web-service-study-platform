// This source file is part of the Stanford Spezi open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT

import { Injectable } from "@nestjs/common";

@Injectable()
export class HealthCheckService {
  getHealthStatus(): { status: string; uptime: number; timestamp: string } {
    return {
      status: "OK",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}
