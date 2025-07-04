import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { ParticipationCriteria } from "./participation-criteria.entity";
import { CreateParticipationCriteriaDto } from "./dto/create-participation-criteria.dto";
import { UpdateParticipationCriteriaDto } from "./dto/update-participation-criteria.dto";
import { StudyDefinition } from "../study-definition/study-definition.entity";
import { ParticipationCriteriaDto } from "./dto/participation-criteria.dto";
import { ParticipationCriteriaMapper } from "./participation-criteria.mapper";

@Injectable()
export class ParticipationCriteriaService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(ParticipationCriteria)
    private readonly repo: EntityRepository<ParticipationCriteria>,
  ) {}

  async findAll(): Promise<ParticipationCriteriaDto[]> {
    const criteriaList: ParticipationCriteria[] = await this.repo.findAll({
      populate: ["studyDefinition"],
    });

    return criteriaList.map((criteria) =>
      ParticipationCriteriaMapper.toDto(criteria),
    );
  }

  async findOne(id: string): Promise<ParticipationCriteriaDto> {
    const criteria = await this.repo.findOne(id, {
      populate: ["studyDefinition"],
    });
    if (!criteria)
      throw new NotFoundException(`ParticipationCriteria ${id} not found`);
    return ParticipationCriteriaMapper.toDto(criteria);
  }

  async create(
    dto: CreateParticipationCriteriaDto,
  ): Promise<ParticipationCriteriaDto> {
    const studyRef = this.em.getReference(StudyDefinition, dto.studyDefinition);

    const criteria = this.repo.create({
      studyDefinition: studyRef,
      type: dto.type,
      value: dto.value,
    });

    await this.em.persistAndFlush(criteria);
    return ParticipationCriteriaMapper.toDto(criteria);
  }

  async update(
    id: string,
    dto: UpdateParticipationCriteriaDto,
  ): Promise<ParticipationCriteriaDto> {
    const criteria: ParticipationCriteria | null = await this.repo.findOne(id, {
      populate: ["studyDefinition"],
    });

    if (!criteria) {
      throw new NotFoundException(`ParticipationCriteria ${id} not found`);
    }

    // Do NOT update studyDefinition
    this.repo.assign(criteria, {
      type: dto.type,
      value: dto.value,
    });

    await this.em.flush();
    return ParticipationCriteriaMapper.toDto(criteria);
  }

  async remove(id: string): Promise<void> {
    const criteria: ParticipationCriteria | null = await this.repo.findOne(id);

    if (!criteria) {
      throw new NotFoundException(`ParticipationCriteria ${id} not found`);
    }

    await this.em.removeAndFlush(criteria);
  }
}
