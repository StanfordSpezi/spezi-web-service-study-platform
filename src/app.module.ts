// This source file is part of the Stanford Spezi open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT

import { MikroOrmModule, MikroOrmModuleSyncOptions } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import mikroOrmConfig from "@database/mikro-orm.config";
import { HealthCheckModule } from "@modules/health-check/health-check.module";
import { StudyDefinitionModule } from "@modules/study-definition/study-definition.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
    MikroOrmModule.forRoot(mikroOrmConfig as MikroOrmModuleSyncOptions),
    HealthCheckModule,
    StudyDefinitionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
