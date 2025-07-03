import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityManager, EntityRepository } from "@mikro-orm/core";

import { ComponentInstance } from "./component-instance.entity";
import { CreateComponentInstanceDto } from "./dto/create-component-instance.dto";
import { UpdateComponentInstanceDto } from "./dto/update-component-instance.dto";
import { StudyDefinition } from "../study-definition/study-definition.entity";
import { ComponentDefinition } from "../component-definition/component-definition.entity";

@Injectable()
export class ComponentInstanceService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(ComponentInstance)
    private readonly repo: EntityRepository<ComponentInstance>,
  ) {}

  async findAll(): Promise<ComponentInstance[]> {
    return this.repo.findAll({
      populate: ["studyDefinition", "componentDefinition", "schedule"],
    });
  }

  async findOne(id: string): Promise<ComponentInstance> {
    const entity = await this.repo.findOne(id, {
      populate: ["studyDefinition", "componentDefinition", "schedule"],
    });
    if (!entity)
      throw new NotFoundException(`ComponentInstance ${id} not found`);
    return entity;
  }

  async create(dto: CreateComponentInstanceDto): Promise<ComponentInstance> {
    // Get references to related entities without querying the DB
    const studyRef = this.em.getReference(StudyDefinition, dto.studyDefinition);
    const componentRef = this.em.getReference(
      ComponentDefinition,
      dto.componentDefinition,
    );

    // Create the ComponentInstance with references and data
    const instance = this.repo.create({
      studyDefinition: studyRef,
      componentDefinition: componentRef,
      details: dto.details,
      displayOrder: dto.displayOrder,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Persist to database
    await this.em.persistAndFlush(instance);

    return instance;
  }

  async update(
    id: string,
    dto: UpdateComponentInstanceDto,
  ): Promise<ComponentInstance> {
    const instance = await this.findOne(id);
    this.repo.assign(instance, dto);
    await this.em.flush();
    return instance;
  }

  async remove(id: string): Promise<void> {
    const instance = await this.findOne(id);
    await this.em.removeAndFlush(instance);
  }
}
