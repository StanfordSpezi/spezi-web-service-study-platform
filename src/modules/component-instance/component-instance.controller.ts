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
import { ComponentInstanceService } from "./component-instance.service";
import { CreateComponentInstanceDto } from "./dto/create-component-instance.dto";
import { UpdateComponentInstanceDto } from "./dto/update-component-instance.dto";

@Controller("component-instances")
export class ComponentInstanceController {
  constructor(private readonly service: ComponentInstanceService) {}

  // GET /component-instances
  // Returns all component instances, including their related entities
  @Get()
  async findAll() {
    return this.service.findAll();
  }

  // GET /component-instances/:id
  // Returns a single component instance by its UUID
  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.service.findOne(id);
  }

  // POST /component-instances
  // Creates a new component instance with the provided DTO
  @Post()
  async create(@Body() dto: CreateComponentInstanceDto) {
    return this.service.create(dto);
  }

  // PUT /component-instances/:id
  // Updates an existing component instance identified by UUID
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() dto: UpdateComponentInstanceDto,
  ) {
    return this.service.update(id, dto);
  }

  // DELETE /component-instances/:id
  // Deletes a component instance by its UUID
  // Returns HTTP 204 No Content if successful
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param("id") id: string) {
    await this.service.remove(id);
  }
}
