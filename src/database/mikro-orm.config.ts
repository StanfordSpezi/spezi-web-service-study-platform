// This source file is part of the Stanford Spezi open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT

import { defineConfig, PostgreSqlDriver } from "@mikro-orm/postgresql";
import { EntityGenerator } from "@mikro-orm/entity-generator";
import { Migrator } from "@mikro-orm/migrations";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import { SeedManager } from "@mikro-orm/seeder";

import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();
console.log("Connecting to DB:", process.env.DB_HOST, process.env.DB_NAME);

export default defineConfig({
  driver: PostgreSqlDriver,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  entities: ["dist/**/*.entity.js"],
  entitiesTs: ["src/**/*.entity.ts"],
  seeder: {
    path: "./src/database/seeds",
    defaultSeeder: "DatabaseSeeder",
  },
  migrations: {
    path: "dist/database/migrations",
    pathTs: "src/database/migrations",
  },
  debug: process.env.DB_DEBUG === "true",
  allowGlobalContext: true,
  highlighter: new SqlHighlighter(),
  extensions: [Migrator, EntityGenerator, SeedManager],
});
