import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { OrderTaxi } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderTaxiService {
  constructor(
    private readonly prisma: PrismaService
  ){}

  async create(createOrderTaxiDto: OrderTaxi) {
    try {
      return this.prisma.orderTaxi.create({ data: {...createOrderTaxiDto} });
    } catch (error) {
      throw new HttpException('Error creating coding', HttpStatus.BAD_REQUEST);
    }
  }

  async getAll() {
    try {
      return this.prisma.orderTaxi.findMany();
    } catch (error) {
      throw new HttpException('Error getAll orders', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getById(id: number) {
    try {
      const order = await this.prisma.orderTaxi.findUnique({ where: {id} });
      if(!order){
        throw new HttpException(`Order with ID ${id} not found`, HttpStatus.NOT_FOUND);
      }
      return order;
    } catch (error) {
      if(error instanceof HttpException){
        throw error;
      }
      throw new HttpException('Error GetById order', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateOrderTaxiDto: OrderTaxi) {
    try {
      const order = await this.prisma.orderTaxi.findUnique({ where: { id } });
      if (!order) {
        throw new HttpException(`Order with ID ${id} not found`, HttpStatus.NOT_FOUND);
      }
      return this.prisma.orderTaxi.update({ where: { id }, data: { ...updateOrderTaxiDto } });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error updating order', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number) {
    try {
      const order = await this.prisma.orderTaxi.findUnique({ where: { id } });
      if (!order) {
        throw new HttpException(`Order with ID ${id} not found`, HttpStatus.NOT_FOUND);
      }
      return this.prisma.orderTaxi.delete({ where: { id } });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error deleting order', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
