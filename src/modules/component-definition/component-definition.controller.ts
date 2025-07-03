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
import { ComponentDefinitionService } from "./component-definition.service";
import { UpdateComponentDefinitionDto } from "./dto/update-component-definition.dto";
import { CreateComponentDefinitionDto } from "./dto/create-component-definiton.dto";

@Controller("component-definitions")
export class ComponentDefinitionController {
  constructor(private readonly service: ComponentDefinitionService) {}

  // GET /component-definitions
  // Returns all component definitions
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // GET /component-definitions/:id
  // Returns a specific component definition by its UUID
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(id);
  }

  // POST /component-definitions
  // Creates a new component definition
  @Post()
  create(@Body() dto: CreateComponentDefinitionDto) {
    return this.service.create(dto);
  }

  // PUT /component-definitions/:id
  // Updates an existing component definition identified by UUID
  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateComponentDefinitionDto) {
    return this.service.update(id, dto);
  }

  // DELETE /component-definitions/:id
  // Deletes a component definition by UUID
  // Returns HTTP 204 No Content if successful
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
