import { UseGuards, Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DriverInfoService } from './driver-info.service';
import { AuthGuard, RolesGuard } from 'src/common/guards';
import { DriverInfo } from '@prisma/client';
import { ApiTags, ApiBearerAuth, ApiProperty } from '@nestjs/swagger';

@UseGuards( AuthGuard, RolesGuard)
@ApiTags('driverInfo')
@Controller('driverInfo')
export class DriverInfoController {
  constructor(private readonly driverInfoService: DriverInfoService) {}

  @ApiBearerAuth()
  @ApiProperty()
  @Post('create')
  async create(@Body() createDriverInfoDto: DriverInfo) {
    return this.driverInfoService.create(createDriverInfoDto);
  }

  @Get('hetAll')
  async getAll() {
    return this.driverInfoService.findAll();
  }

  @ApiProperty()
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.driverInfoService.getById(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDriverInfoDto: DriverInfo) {
    return this.driverInfoService.update(id, updateDriverInfoDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.driverInfoService.delete(id);
  }
}
