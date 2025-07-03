import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { ComponentScheduleService } from "./component-schedule.service";
import { CreateComponentScheduleDto } from "./dto/create-component-schedule.dto";
import { UpdateComponentScheduleDto } from "./dto/update-component-schedule.dto";

@Controller("component-schedules")
export class ComponentScheduleController {
  constructor(private readonly service: ComponentScheduleService) {}

  // GET /component-schedules
  // Returns all component schedules
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // GET /component-schedules/:id
  // Returns a specific schedule by ID
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(id);
  }

  // POST /component-schedules
  // Creates a new component schedule
  @Post()
  create(@Body() dto: CreateComponentScheduleDto) {
    return this.service.create(dto);
  }

  // PUT /component-schedules/:id
  // Updates an existing component schedule
  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateComponentScheduleDto) {
    return this.service.update(id, dto);
  }

  // DELETE /component-schedules/:id
  // Deletes a component schedule by ID
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
