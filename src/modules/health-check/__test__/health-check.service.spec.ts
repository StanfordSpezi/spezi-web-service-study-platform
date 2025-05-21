// This source file is part of the Stanford Spezi open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT

import { HealthCheckService } from "../health-check.service";

describe("HealthCheckService", () => {
  let service: HealthCheckService;

  beforeEach(() => {
    service = new HealthCheckService();
  });

  it("should return health status", () => {
    const result = service.getHealthStatus();
    expect(result).toHaveProperty("status", "OK");
    expect(result).toHaveProperty("uptime");
    expect(result).toHaveProperty("timestamp");
  });
});
