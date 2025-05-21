// This source file is part of the Stanford Spezi open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT

import { type Options } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { type ConfigService } from "@nestjs/config";

const MikroOrmConfig = (configService: ConfigService): Options => ({
  driver: PostgreSqlDriver,
  host: configService.get<string>("DB_HOST"),
  port: configService.get<number>("DB_PORT"),
  user: configService.get<string>("DB_USER"),
  password: configService.get<string>("DB_PASSWORD"),
  dbName: configService.get<string>("DB_NAME"),
  entities: ["dist/**/*.entity.js"], // Path for compiled entities
  entitiesTs: ["src/**/*.entity.ts"], // Path for TypeScript entities
  debug: configService.get<boolean>("DB_DEBUG", false),
  migrations: {
    path: "dist/database/migrations",
    pathTs: "src/database/migrations",
  },
  allowGlobalContext: true,
});

export { MikroOrmConfig };
