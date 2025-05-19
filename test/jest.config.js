// This source file is part of the Stanford Spezi open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT

const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("../tsconfig.json");

module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "../",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  collectCoverage: true,
  coverageDirectory: "./coverage",
  testEnvironment: "node",
  projects: [
    "<rootDir>/test/jest.unit.json",
    "<rootDir>/test/jest.integration.json",
    "<rootDir>/test/jest.e2e.json",
  ],
};
