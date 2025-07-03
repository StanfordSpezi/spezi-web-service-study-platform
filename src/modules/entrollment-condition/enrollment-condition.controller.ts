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
import { EnrollmentConditionService } from "./enrollment-condition.service";
import { CreateEnrollmentConditionDto } from "./dto/create-enrollment-condition.dto";
import { UpdateEnrollmentConditionDto } from "./dto/update-enrollment-condition.dto";

@Controller("enrollment-conditions")
export class EnrollmentConditionController {
  constructor(private readonly service: EnrollmentConditionService) {}

  // GET /enrollment-conditions
  // Returns all enrollment conditions, including associated study definitions
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // GET /enrollment-conditions/:id
  // Returns a single enrollment condition by its UUID
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(id);
  }

  // POST /enrollment-conditions
  // Creates a new enrollment condition linked to a study definition
  @Post()
  create(@Body() dto: CreateEnrollmentConditionDto) {
    return this.service.create(dto);
  }

  // PUT /enrollment-conditions/:id
  // Updates an existing enrollment condition identified by UUID
  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateEnrollmentConditionDto) {
    return this.service.update(id, dto);
  }

  // DELETE /enrollment-conditions/:id
  // Deletes an enrollment condition by UUID
  // Returns HTTP 204 No Content if successful
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
