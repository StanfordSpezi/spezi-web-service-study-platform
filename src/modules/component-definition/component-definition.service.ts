import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { ComponentDefinition } from "./component-definition.entity";
import { CreateComponentDefinitionDto } from "./dto/create-component-definiton.dto";
import { UpdateComponentDefinitionDto } from "./dto/update-component-definition.dto";

@Injectable()
export class ComponentDefinitionService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(ComponentDefinition)
    private readonly repo: EntityRepository<ComponentDefinition>,
  ) {}

  async findAll(): Promise<ComponentDefinition[]> {
    return this.repo.findAll();
  }

  async findOne(id: string): Promise<ComponentDefinition> {
    const entity = await this.repo.findOne(id);
    if (!entity)
      throw new NotFoundException(`ComponentDefinition ${id} not found`);
    return entity;
  }

  async create(
    dto: CreateComponentDefinitionDto,
  ): Promise<ComponentDefinition> {
    const now = new Date();
    const entity = this.repo.create({
      ...dto,
      createdAt: now,
      updatedAt: now,
    });
    await this.em.persistAndFlush(entity);
    return entity;
  }

  async update(
    id: string,
    dto: UpdateComponentDefinitionDto,
  ): Promise<ComponentDefinition> {
    const entity = await this.findOne(id);
    this.repo.assign(entity, {
      ...dto,
      updatedAt: new Date(),
    });
    await this.em.flush();
    return entity;
  }

  async remove(id: string): Promise<void> {
    const entity = await this.findOne(id);
    await this.em.removeAndFlush(entity);
  }
}
