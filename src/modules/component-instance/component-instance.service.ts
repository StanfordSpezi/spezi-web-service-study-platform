import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityManager, EntityRepository } from "@mikro-orm/core";

import { ComponentInstance } from "./component-instance.entity";
import { CreateComponentInstanceDto } from "./dto/create-component-instance.dto";
import { UpdateComponentInstanceDto } from "./dto/update-component-instance.dto";
import { StudyDefinition } from "../study-definition/study-definition.entity";
import { ComponentDefinition } from "../component-definition/component-definition.entity";
import { ComponentInstanceDto } from "./dto/component-instance.dto";
import { ComponentInstanceMapper } from "./component-instance.mapper";

@Injectable()
export class ComponentInstanceService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(ComponentInstance)
    private readonly repo: EntityRepository<ComponentInstance>,
  ) {}

  async findAll(): Promise<ComponentInstanceDto[]> {
    const instances: ComponentInstance[] = await this.repo.findAll({
      populate: ["studyDefinition", "componentDefinition", "schedule"],
    });

    return instances.map((instance) => ComponentInstanceMapper.toDto(instance));
  }

  async findOne(id: string): Promise<ComponentInstanceDto> {
    const instance: ComponentInstance | null = await this.repo.findOne(id, {
      populate: ["studyDefinition", "componentDefinition", "schedule"],
    });

    if (!instance) {
      throw new NotFoundException(`ComponentInstance ${id} not found`);
    }

    return ComponentInstanceMapper.toDto(instance);
  }

  async create(dto: CreateComponentInstanceDto): Promise<ComponentInstanceDto> {
    const studyRef = this.em.getReference(
      StudyDefinition,
      dto.studyDefinitionId,
    );
    const componentRef = this.em.getReference(
      ComponentDefinition,
      dto.componentDefinitionId,
    );

    const instance = this.repo.create({
      studyDefinition: studyRef,
      componentDefinition: componentRef,
      details: dto.details,
      displayOrder: dto.displayOrder,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.em.persistAndFlush(instance);
    return ComponentInstanceMapper.toDto(instance);
  }

  async update(
    id: string,
    dto: UpdateComponentInstanceDto,
  ): Promise<ComponentInstanceDto> {
    const instance: ComponentInstance | null = await this.repo.findOne(id, {
      populate: ["studyDefinition", "componentDefinition", "schedule"],
    });

    if (!instance) {
      throw new NotFoundException(`ComponentInstance ${id} not found`);
    }

    // Do NOT update studyDefinition/componentDefinition
    this.repo.assign(instance, {
      details: dto.details,
      displayOrder: dto.displayOrder,
      updatedAt: new Date(),
    });

    await this.em.flush();
    return ComponentInstanceMapper.toDto(instance);
  }

  async remove(id: string): Promise<void> {
    const instance: ComponentInstance | null = await this.repo.findOne(id);

    if (!instance) {
      throw new NotFoundException(`ComponentInstance ${id} not found`);
    }

    await this.em.removeAndFlush(instance);
  }
}
