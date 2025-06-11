// This source file is part of the Stanford Spezi open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT

import { EntityManager, wrap } from "@mikro-orm/core";
import { Injectable, BadRequestException } from "@nestjs/common";
import { CreateStudyDefinitionDto } from "./dto/create-study-definition.dto";
import { StudyDefinition } from "./entities/study-definition.entity";
import { EnrollmentCondition } from "./entities/enrollment-condition.entity";
import { ParticipationCriteria } from "./entities/participation-criteria.entity";
import { ComponentInstance } from "./entities/component-instance.entity";
import { ComponentSchedule } from "./entities/component-schedule.entity";
import { ComponentDefinition } from "./entities/component-definition.entity";

@Injectable()
export class StudyDefinitionService {
  constructor(private readonly em: EntityManager) {}

  async create(dto: CreateStudyDefinitionDto): Promise<string> {
    return await this.em.transactional(async (em) => {
      // Create base study entity
      const study = new StudyDefinition();
      wrap(study).assign({
        schemaVersion: dto.schemaVersion,
        title: dto.title,
        shortTitle: dto.shortTitle,
        explanationText: dto.explanationText,
        shortExplanationText: dto.shortExplanationText,
        iconSymbol: dto.iconSymbol,
      });

      // Handle optional enrollment condition
      if (dto.enrollmentCondition) {
        const condition = new EnrollmentCondition();
        wrap(condition).assign({
          requiresInvite: dto.enrollmentCondition.requiresInvite,
          inviteUrl: dto.enrollmentCondition.inviteUrl,
        });
        condition.studyDefinition = study;
        study.enrollmentCondition = condition;
        em.persist(condition);
      }

      // Create participation criteria
      const criteriaById = new Map<string, ParticipationCriteria>();

      if (dto.participationCriteria) {
        for (const pcDto of dto.participationCriteria) {
          const criteria = new ParticipationCriteria();
          wrap(criteria).assign({
            type: pcDto.type,
            value: pcDto.value,
            grouping: pcDto.grouping,
          });
          criteria.studyDefinition = study;

          if (pcDto.parentId) {
            const parent =
              criteriaById.get(pcDto.parentId) ??
              (await em.findOne(ParticipationCriteria, pcDto.parentId));
            if (!parent) {
              throw new BadRequestException(
                `Parent participationCriteria with id ${pcDto.parentId} not found`,
              );
            }
            criteria.parent = parent;
          }

          study.participationCriteria.add(criteria);
          em.persist(criteria);
          criteriaById.set(criteria.id, criteria);
        }
      }

      // Process all components and attach to study
      // Each component must reference a valid ComponentDefinition
      for (const componentDto of dto.components) {
        const componentDefinition = await em.findOne(
          ComponentDefinition,
          componentDto.componentDefinitionId,
        );

        if (!componentDefinition) {
          throw new BadRequestException(
            `ComponentDefinition with id ${componentDto.componentDefinitionId} not found`,
          );
        }

        const instance = new ComponentInstance();
        wrap(instance).assign({
          studyDefinition: study,
          componentDefinition,
          displayOrder: componentDto.displayOrder,
          details: componentDto.details,
        });

        if (componentDto.schedule) {
          const schedule = new ComponentSchedule();
          wrap(schedule).assign({
            componentInstance: instance,
            completionPolicy: componentDto.schedule.completionPolicy,
            startOffsetDays: componentDto.schedule.startOffsetDays,
            repeatMetadata: componentDto.schedule.repeatMetadata ?? {},
          });
          instance.schedule = schedule;
          em.persist(schedule);
        }

        study.componentInstances.add(instance);
        em.persist(instance);
      }

      em.persist(study);
      await em.flush();

      return study.id;
    });
  }
}
