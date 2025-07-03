import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityManager, EntityRepository } from "@mikro-orm/core";

import { EnrollmentCondition } from "./enrollment-condition.entity";
import { CreateEnrollmentConditionDto } from "./dto/create-enrollment-condition.dto";
import { UpdateEnrollmentConditionDto } from "./dto/update-enrollment-condition.dto";
import { StudyDefinition } from "../study-definition/study-definition.entity";

@Injectable()
export class EnrollmentConditionService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(EnrollmentCondition)
    private readonly repo: EntityRepository<EnrollmentCondition>,
  ) {}

  async findAll(): Promise<EnrollmentCondition[]> {
    return this.repo.findAll({ populate: ["studyDefinition"] });
  }

  async findOne(id: string): Promise<EnrollmentCondition> {
    const condition = await this.repo.findOne(id, {
      populate: ["studyDefinition"],
    });
    if (!condition)
      throw new NotFoundException(`EnrollmentCondition ${id} not found`);
    return condition;
  }

  async create(
    dto: CreateEnrollmentConditionDto,
  ): Promise<EnrollmentCondition> {
    const studyRef = this.em.getReference(StudyDefinition, dto.studyDefinition);

    const condition = this.repo.create({
      studyDefinition: studyRef,
      requiresInvite: dto.requiresInvite,
      inviteUrl: dto.inviteUrl,
    });

    await this.em.persistAndFlush(condition);
    return condition;
  }

  async update(
    id: string,
    dto: UpdateEnrollmentConditionDto,
  ): Promise<EnrollmentCondition> {
    const condition = await this.findOne(id);

    if (dto.studyDefinition) {
      condition.studyDefinition = this.em.getReference(
        StudyDefinition,
        dto.studyDefinition,
      );
    }

    this.repo.assign(condition, {
      requiresInvite: dto.requiresInvite,
      inviteUrl: dto.inviteUrl,
    });

    await this.em.flush();
    return condition;
  }

  async remove(id: string): Promise<void> {
    const condition = await this.findOne(id);
    await this.em.removeAndFlush(condition);
  }
}
