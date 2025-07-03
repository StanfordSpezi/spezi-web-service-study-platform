import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { StudyDefinitionService } from "./study-definition.service";
import { UpdateStudyDefinitionDto } from "./dto/update-study-definition.dto";
import { CreateStudyDefinitionDto } from "./dto/create-study-definition.dto";

@Controller("study-definitions")
export class StudyDefinitionController {
  constructor(private readonly service: StudyDefinitionService) {}

  // GET /study-definitions
  // Returns all study definitions, including relations
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // GET /study-definitions/:id
  // Returns a single study definition by ID
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(id);
  }

  // POST /study-definitions
  // Creates a new study definition
  @Post()
  create(@Body() dto: CreateStudyDefinitionDto) {
    return this.service.create(dto);
  }

  // PUT /study-definitions/:id
  // Updates an existing study definition by ID
  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateStudyDefinitionDto) {
    return this.service.update(id, dto);
  }

  // DELETE /study-definitions/:id
  // Deletes a study definition by ID
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
