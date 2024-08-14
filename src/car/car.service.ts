import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Car } from '@prisma/client';

@Injectable()
export class CarService {
  constructor(
    private readonly prisma: PrismaService
  ){}

  async create(createCarDto: Car) {
    return this.prisma.car.create( {data: {...createCarDto} } );
  }

  async getAll(): Promise<Car[]> {
    return this.prisma.car.findMany();
  }

  async getById(id: number) {
    return this.prisma.car.findUnique({ where: {id} });
  }

  async update(id: number, updateCarDto: Car) {
    return this.prisma.car.update({ where: {id}, data: { ...updateCarDto }});
  }

  async delete(id: number) {
    return this.prisma.car.delete({ where: {id} });
  }
}
