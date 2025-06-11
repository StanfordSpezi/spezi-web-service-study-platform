// This source file is part of the Stanford Spezi open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT

import { EntityManager, wrap } from "@mikro-orm/core";
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { CreateStudyDefinitionDto } from "./dto/create-study-definition.dto";
import { StudyDefinition } from "./entities/study-definition.entity";
import { EnrollmentCondition } from "./entities/enrollment-condition.entity";
import { ParticipationCriteria } from "./entities/participation-criteria.entity";
import { ComponentInstance } from "./entities/component-instance.entity";
import { ComponentSchedule } from "./entities/component-schedule.entity";
import { ComponentDefinition } from "./entities/component-definition.entity";
import { GetComponentInstanceDto } from "./dto/get-component-instance.dto";
import { GetStudyDefinitionDto } from "./dto/get-study-definition.dto";
import { RepeatMetadata } from "./dto/component-schedule.dto";

@Injectable()
export class StudyDefinitionService {
  constructor(private readonly em: EntityManager) {}

  async getById(id: string): Promise<GetStudyDefinitionDto> {
    const study = await this.em.findOne(StudyDefinition, id, {
      populate: [
        "enrollmentCondition",
        "participationCriteria",
        "componentInstances",
        "componentInstances.schedule",
        "componentInstances.componentDefinition",
      ],
    });

    if (!study) {
      throw new NotFoundException(`StudyDefinition with ID ${id} not found`);
    }

    return {
      id: study.id,
      schemaVersion: study.schemaVersion,
      title: study.title,
      shortTitle: study.shortTitle,
      explanationText: study.explanationText,
      shortExplanationText: study.shortExplanationText,
      iconSymbol: study.iconSymbol,
      enrollmentCondition: study.enrollmentCondition
        ? {
            requiresInvite: study.enrollmentCondition.requiresInvite,
            inviteUrl: study.enrollmentCondition.inviteUrl,
          }
        : undefined,
      participationCriteria: study.participationCriteria
        .getItems()
        .map((pc) => ({
          type: pc.type,
          value: pc.value,
        })),
      components: study.componentInstances
        .getItems()
        .map<GetComponentInstanceDto>((ci) => ({
          id: ci.id,
          componentDefinitionId: ci.componentDefinition.id,
          displayOrder: ci.displayOrder,
          details: ci.details,
          schedule: ci.schedule
            ? {
                completionPolicy: ci.schedule.completionPolicy,
                startOffsetDays: ci.schedule.startOffsetDays,
                repeatMetadata: ci.schedule.repeatMetadata as RepeatMetadata,
              }
            : undefined,
        })),
    };
  }

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
      // Flat list of participation criteria (no parentId logic)
      if (dto.participationCriteria) {
        for (const pcDto of dto.participationCriteria) {
          const criteria = new ParticipationCriteria();
          wrap(criteria).assign({
            type: pcDto.type,
            value: pcDto.value,
          });
          criteria.studyDefinition = study;
          study.participationCriteria.add(criteria);
          em.persist(criteria);
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
