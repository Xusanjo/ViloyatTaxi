import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CarService } from './car.service';
import { AuthGuard, RolesGuard } from 'src/common/guards';
import { Car } from '@prisma/client';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard, RolesGuard)
@ApiTags('car')
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @ApiBearerAuth()
  @ApiProperty()
  @Post('create')
  create(@Body() createCarDto: Car) {
    return this.carService.create(createCarDto);
  }

  @Get('getAll')
  getAll() {
    return this.carService.getAll();
  }

  @ApiProperty()
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.carService.getById(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCarDto: Car) {
    return this.carService.update(id, updateCarDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.carService.delete(+id);
  }
}
