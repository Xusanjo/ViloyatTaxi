import { UseGuards, Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AddresService } from './addres.service';
import { Addres } from '@prisma/client';
import { ApiTags, ApiProperty, ApiBearerAuth } from '@nestjs/swagger';
import { Roles, Role } from 'src/common/guards';
import { AuthGuard, RolesGuard } from 'src/common/guards';

@UseGuards(AuthGuard, RolesGuard)
@ApiTags('address')
@Controller('address')
export class AddresController {
  constructor(private readonly addresService: AddresService) {}

  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.USER)
  @Post('create')
  async create(@Body() createAddreDto: Addres) {
    return this.addresService.create(createAddreDto);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get('getAll')
  async getAll() {
    return this.addresService.getAll();
  }

  @ApiProperty()
  @Roles(Role.ADMIN, Role.USER)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.addresService.getById(id);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateAddreDto: Addres) {
    return this.addresService.update(id, updateAddreDto);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.addresService.delete(id);
  }
}
