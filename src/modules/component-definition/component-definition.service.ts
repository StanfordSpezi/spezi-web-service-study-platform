import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { ComponentDefinition } from "./component-definition.entity";
import { CreateComponentDefinitionDto } from "./dto/create-component-definiton.dto";
import { UpdateComponentDefinitionDto } from "./dto/update-component-definition.dto";
import { ComponentDefinitionDto } from "./dto/component-definition.dto";
import { ComponentDefinitionMapper } from "./component-definition.mapper";

@Injectable()
export class ComponentDefinitionService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(ComponentDefinition)
    private readonly repo: EntityRepository<ComponentDefinition>,
  ) {}

  async findAll(): Promise<ComponentDefinitionDto[]> {
    const entities = await this.repo.findAll();
    return entities.map((entity) => ComponentDefinitionMapper.toDto(entity));
  }

  async findOne(id: string): Promise<ComponentDefinitionDto> {
    const entity = await this.repo.findOne(id);
    if (!entity)
      throw new NotFoundException(`ComponentDefinition ${id} not found`);
    return ComponentDefinitionMapper.toDto(entity);
  }

  async create(
    dto: CreateComponentDefinitionDto,
  ): Promise<ComponentDefinitionDto> {
    const now = new Date();
    const entity = this.repo.create({
      ...dto,
      createdAt: now,
      updatedAt: now,
    });
    await this.em.persistAndFlush(entity);
    return ComponentDefinitionMapper.toDto(entity);
  }

  async update(
    id: string,
    dto: UpdateComponentDefinitionDto,
  ): Promise<ComponentDefinitionDto> {
    const entity = await this.findOne(id);
    this.repo.assign(entity, {
      ...dto,
      updatedAt: new Date(),
    });
    await this.em.flush();
    return ComponentDefinitionMapper.toDto(entity);
  }

  async remove(id: string): Promise<void> {
    const entity = await this.findOne(id);
    await this.em.removeAndFlush(entity);
  }
}
