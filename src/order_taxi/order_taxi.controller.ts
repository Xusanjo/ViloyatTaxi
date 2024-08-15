import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrderTaxiService } from './order_taxi.service';
import { AuthGuard, RolesGuard } from 'src/common/guards';
import { OrderTaxi } from '@prisma/client';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard, RolesGuard)
@ApiTags('OrderTaxi')
@Controller('OrderTaxi')
export class OrderTaxiController {
  constructor(private readonly orderTaxiService: OrderTaxiService) {}

  @ApiBearerAuth()
  @ApiProperty()
  @Post("create")
  create(@Body() createOrderTaxiDto: OrderTaxi) {
    return this.orderTaxiService.create(createOrderTaxiDto);
  }

  @Get("getAll")
  getAll() {
    return this.orderTaxiService.getAll();
  }

  @ApiProperty()
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.orderTaxiService.getById(id);
  }
  
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateOrderTaxiDto: OrderTaxi) {
    return this.orderTaxiService.update(id, updateOrderTaxiDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.orderTaxiService.delete(id);
  }
}
