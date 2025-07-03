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
import { ParticipationCriteriaService } from "./participation-criteria.service";
import { CreateParticipationCriteriaDto } from "./dto/create-participation-criteria.dto";
import { UpdateParticipationCriteriaDto } from "./dto/update-participation-criteria.dto";

@Controller("participation-criteria")
export class ParticipationCriteriaController {
  constructor(private readonly service: ParticipationCriteriaService) {}

  // GET /participation-criteria
  // Returns all participation criteria, including associated study definitions
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // GET /participation-criteria/:id
  // Returns a single participation criterion by its UUID
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(id);
  }

  // POST /participation-criteria
  // Creates a new participation criterion for a specific study
  @Post()
  create(@Body() dto: CreateParticipationCriteriaDto) {
    return this.service.create(dto);
  }

  // PUT /participation-criteria/:id
  // Updates an existing participation criterion identified by UUID
  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateParticipationCriteriaDto) {
    return this.service.update(id, dto);
  }

  // DELETE /participation-criteria/:id
  // Deletes a participation criterion by UUID
  // Returns HTTP 204 No Content if successful
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
