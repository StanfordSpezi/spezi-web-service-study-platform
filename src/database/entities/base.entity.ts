// This source file is part of the Stanford Spezi open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT

import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { UUID } from "crypto";

@Entity({ abstract: true })
export abstract class BaseEntity {
  @PrimaryKey()
  id!: UUID;

  @Property({ type: "date", defaultRaw: "now()" })
  createdAt: Date = new Date();

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
