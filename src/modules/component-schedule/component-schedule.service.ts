import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { ComponentSchedule } from "./component-schedule.entity";
import { CreateComponentScheduleDto } from "./dto/create-component-schedule.dto";
import { UpdateComponentScheduleDto } from "./dto/update-component-schedule.dto";
import { ComponentInstance } from "../component-instance/component-instance.entity";

@Injectable()
export class ComponentScheduleService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(ComponentSchedule)
    private readonly repo: EntityRepository<ComponentSchedule>,
  ) {}

  async findAll(): Promise<ComponentSchedule[]> {
    return this.repo.findAll({ populate: ["componentInstance"] });
  }

  async findOne(id: string): Promise<ComponentSchedule> {
    const schedule = await this.repo.findOne(id, {
      populate: ["componentInstance"],
    });
    if (!schedule)
      throw new NotFoundException(`ComponentSchedule ${id} not found`);
    return schedule;
  }

  async create(dto: CreateComponentScheduleDto): Promise<ComponentSchedule> {
    const instanceRef = this.em.getReference(
      ComponentInstance,
      dto.componentInstance,
    );

    const schedule = this.repo.create({
      componentInstance: instanceRef,
      completionPolicy: dto.completionPolicy,
      startOffsetDays: dto.startOffsetDays,
      repeatMetadata: dto.repeatMetadata,
    });

    await this.em.persistAndFlush(schedule);
    return schedule;
  }

  async update(
    id: string,
    dto: UpdateComponentScheduleDto,
  ): Promise<ComponentSchedule> {
    const schedule = await this.findOne(id);

    if (dto.componentInstance) {
      schedule.componentInstance = this.em.getReference(
        ComponentInstance,
        dto.componentInstance,
      );
    }

    this.repo.assign(schedule, {
      completionPolicy: dto.completionPolicy,
      startOffsetDays: dto.startOffsetDays,
      repeatMetadata: dto.repeatMetadata,
    });

    await this.em.flush();
    return schedule;
  }

  async remove(id: string): Promise<void> {
    const schedule = await this.findOne(id);
    await this.em.removeAndFlush(schedule);
  }
}
