import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityManager, EntityRepository } from "@mikro-orm/core";

import { StudyDefinition } from "./study-definition.entity";
import { UpdateStudyDefinitionDto } from "./dto/update-study-definition.dto";
import { CreateStudyDefinitionDto } from "./dto/create-study-definition.dto";
import { StudyDefinitionDto } from "./dto/study-definition.dto";
import { StudyDefinitionMapper } from "./study-defintion.mapper";

@Injectable()
export class StudyDefinitionService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(StudyDefinition)
    private readonly repo: EntityRepository<StudyDefinition>,
  ) {}

  async findAll(): Promise<StudyDefinitionDto[]> {
    const studies: StudyDefinition[] = await this.repo.findAll({
      populate: [
        "enrollmentCondition",
        "participationCriteria",
        "componentInstances",
      ],
    });

    return studies.map((study) => StudyDefinitionMapper.toDto(study));
  }

  async findOne(id: string): Promise<StudyDefinitionDto> {
    const study = await this.repo.findOne(id, {
      populate: [
        "enrollmentCondition",
        "participationCriteria",
        "componentInstances",
      ],
    });
    if (!study) throw new NotFoundException(`StudyDefinition ${id} not found`);
    return StudyDefinitionMapper.toDto(study);
  }

  async create(dto: CreateStudyDefinitionDto): Promise<StudyDefinitionDto> {
    const study = this.repo.create(dto);
    await this.em.persistAndFlush(study);
    return StudyDefinitionMapper.toDto(study);
  }

  async update(
    id: string,
    dto: UpdateStudyDefinitionDto,
  ): Promise<StudyDefinitionDto> {
    const study: StudyDefinition | null = await this.repo.findOne(id);

    if (!study) {
      throw new NotFoundException(`StudyDefinition ${id} not found`);
    }

    this.repo.assign(study, dto);
    await this.em.flush();
    return StudyDefinitionMapper.toDto(study);
  }

  async remove(id: string): Promise<void> {
    const study: StudyDefinition | null = await this.repo.findOne(id);

    if (!study) {
      throw new NotFoundException(`StudyDefinition ${id} not found`);
    }

    await this.em.removeAndFlush(study);
  }
}
