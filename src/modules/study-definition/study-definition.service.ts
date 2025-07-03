import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityManager, EntityRepository } from "@mikro-orm/core";

import { StudyDefinition } from "./study-definition.entity";
import { UpdateStudyDefinitionDto } from "./dto/update-study-definition.dto";
import { CreateStudyDefinitionDto } from "./dto/create-study-definition.dto";

@Injectable()
export class StudyDefinitionService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(StudyDefinition)
    private readonly repo: EntityRepository<StudyDefinition>,
  ) {}

  async findAll(): Promise<StudyDefinition[]> {
    return this.repo.findAll({
      populate: [
        "enrollmentCondition",
        "participationCriteria",
        "componentInstances",
      ],
    });
  }

  async findOne(id: string): Promise<StudyDefinition> {
    const study = await this.repo.findOne(id, {
      populate: [
        "enrollmentCondition",
        "participationCriteria",
        "componentInstances",
      ],
    });
    if (!study) throw new NotFoundException(`StudyDefinition ${id} not found`);
    return study;
  }

  async create(dto: CreateStudyDefinitionDto): Promise<StudyDefinition> {
    const study = this.repo.create(dto);
    await this.em.persistAndFlush(study);
    return study;
  }

  async update(
    id: string,
    dto: UpdateStudyDefinitionDto,
  ): Promise<StudyDefinition> {
    const study = await this.findOne(id);
    this.repo.assign(study, dto);
    await this.em.flush();
    return study;
  }

  async remove(id: string): Promise<void> {
    const study = await this.findOne(id);
    await this.em.removeAndFlush(study);
  }
}
