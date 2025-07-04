import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityManager, EntityRepository } from "@mikro-orm/core";

import { EnrollmentCondition } from "./enrollment-condition.entity";
import { CreateEnrollmentConditionDto } from "./dto/create-enrollment-condition.dto";
import { UpdateEnrollmentConditionDto } from "./dto/update-enrollment-condition.dto";
import { StudyDefinition } from "../study-definition/study-definition.entity";
import { EnrollmentConditionMapper } from "./entrollment-condition.mapper";
import { EnrollmentConditionDto } from "./dto/enrollment-criteria.dto";

@Injectable()
export class EnrollmentConditionService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(EnrollmentCondition)
    private readonly repo: EntityRepository<EnrollmentCondition>,
  ) {}

  async findAll(): Promise<EnrollmentConditionDto[]> {
    const conditions: EnrollmentCondition[] = await this.repo.findAll({
      populate: ["studyDefinition"],
    });

    return conditions.map((condition) =>
      EnrollmentConditionMapper.toDto(condition),
    );
  }

  async findOne(id: string): Promise<EnrollmentConditionDto> {
    const condition = await this.repo.findOne(id, {
      populate: ["studyDefinition"],
    });
    if (!condition)
      throw new NotFoundException(`EnrollmentCondition ${id} not found`);
    return EnrollmentConditionMapper.toDto(condition);
  }

  async create(
    dto: CreateEnrollmentConditionDto,
  ): Promise<EnrollmentConditionDto> {
    const studyRef = this.em.getReference(StudyDefinition, dto.studyDefinition);

    const condition = this.repo.create({
      studyDefinition: studyRef,
      requiresInvite: dto.requiresInvite,
      inviteUrl: dto.inviteUrl,
    });

    await this.em.persistAndFlush(condition);
    return EnrollmentConditionMapper.toDto(condition);
  }

  async update(
    id: string,
    dto: UpdateEnrollmentConditionDto,
  ): Promise<EnrollmentConditionDto> {
    const condition: EnrollmentCondition | null = await this.repo.findOne(id, {
      populate: ["studyDefinition"],
    });

    if (!condition) {
      throw new NotFoundException(`EnrollmentCondition ${id} not found`);
    }

    // Do NOT update studyDefinition
    this.repo.assign(condition, {
      requiresInvite: dto.requiresInvite,
      inviteUrl: dto.inviteUrl,
    });

    await this.em.flush();
    return EnrollmentConditionMapper.toDto(condition);
  }

  async remove(id: string): Promise<void> {
    const condition: EnrollmentCondition | null = await this.repo.findOne(id);

    if (!condition) {
      throw new NotFoundException(`EnrollmentCondition ${id} not found`);
    }

    await this.em.removeAndFlush(condition);
  }
}
