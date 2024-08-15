import { UseGuards, Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DefinitionService } from './definition.service';
import { Definition } from '@prisma/client';
import { ApiTags, ApiBearerAuth, ApiProperty } from '@nestjs/swagger';
import { Roles, Role } from 'src/common/guards';
import { AuthGuard, RolesGuard } from 'src/common/guards';

@UseGuards(AuthGuard, RolesGuard)
@ApiTags('definition')
@Controller('definition')
export class DefinitionController {
  constructor(private readonly definitionService: DefinitionService) {}

  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.USER)
  @Post('create')
  async create(@Body() createDefinitionDto: Definition) {
    return this.definitionService.create(createDefinitionDto);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get('getAll')
  async getAll() {
    return this.definitionService.getAll();
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.definitionService.getById(id);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateDefinitionDto: Definition) {
    return this.definitionService.update(id, updateDefinitionDto);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.definitionService.delete(id);
  }
}
