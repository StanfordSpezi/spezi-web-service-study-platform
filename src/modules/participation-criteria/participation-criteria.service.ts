import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { ParticipationCriteria } from "./participation-criteria.entity";
import { CreateParticipationCriteriaDto } from "./dto/create-participation-criteria.dto";
import { UpdateParticipationCriteriaDto } from "./dto/update-participation-criteria.dto";
import { StudyDefinition } from "../study-definition/study-definition.entity";

@Injectable()
export class ParticipationCriteriaService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(ParticipationCriteria)
    private readonly repo: EntityRepository<ParticipationCriteria>,
  ) {}

  async findAll(): Promise<ParticipationCriteria[]> {
    return this.repo.findAll({ populate: ["studyDefinition"] });
  }

  async findOne(id: string): Promise<ParticipationCriteria> {
    const criteria = await this.repo.findOne(id, {
      populate: ["studyDefinition"],
    });
    if (!criteria)
      throw new NotFoundException(`ParticipationCriteria ${id} not found`);
    return criteria;
  }

  async create(
    dto: CreateParticipationCriteriaDto,
  ): Promise<ParticipationCriteria> {
    const studyRef = this.em.getReference(StudyDefinition, dto.studyDefinition);

    const criteria = this.repo.create({
      studyDefinition: studyRef,
      type: dto.type,
      value: dto.value,
    });

    await this.em.persistAndFlush(criteria);
    return criteria;
  }

  async update(
    id: string,
    dto: UpdateParticipationCriteriaDto,
  ): Promise<ParticipationCriteria> {
    const criteria = await this.findOne(id);

    if (dto.studyDefinition) {
      criteria.studyDefinition = this.em.getReference(
        StudyDefinition,
        dto.studyDefinition,
      );
    }

    this.repo.assign(criteria, {
      type: dto.type,
      value: dto.value,
    });

    await this.em.flush();
    return criteria;
  }

  async remove(id: string): Promise<void> {
    const criteria = await this.findOne(id);
    await this.em.removeAndFlush(criteria);
  }
}
