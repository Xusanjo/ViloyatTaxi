import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { DriverService } from './driver.service';
import { ApiTags, ApiProperty, ApiBearerAuth} from "@nestjs/swagger";
import { Driver } from '@prisma/client';
import { AuthGuard, RolesGuard } from 'src/common/guards';
import { CreateDriverDto, UpdateDriverDto } from "src/common/dto";

@UseGuards(AuthGuard, RolesGuard)
@ApiTags('driver')
@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}
  
  @ApiProperty({type: CreateDriverDto})
  @ApiBearerAuth()
  @Post('create')
  async create(@Body() createDriverDto: CreateDriverDto) {
    try {
      return await this.driverService.create(createDriverDto);
    } catch (error) {
      throw new HttpException('ErrorCreating driver', HttpStatus.BAD_REQUEST);
    }
  }
  
  @Get('getAll')
  async getAllDrivers(): Promise<Driver[]> {
    return this.driverService.getAllDrivers();
  }

  @Get(':id')
  async getDriverById(@Param('id') id: number): Promise<Driver | null> {
    try {
      return await this.driverService.getDriverById(id);
    } catch (error) {
      throw new HttpException('Error getting driver', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBearerAuth()
  @ApiProperty({ type: UpdateDriverDto})
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateDriverDto: UpdateDriverDto): Promise<Driver> {
    try {
      return await this.driverService.update(id, updateDriverDto);
    } catch (error) {
      throw new HttpException('Error updating driver', HttpStatus.BAD_REQUEST);
    }
  }

  @ApiBearerAuth()
  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      return await this.driverService.remove(id);
    } catch (error) {
      throw new HttpException('Error deleting driver', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
