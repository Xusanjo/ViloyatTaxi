import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; 
import { DriverInfo } from '@prisma/client';

@Injectable()
export class DriverInfoService {
  constructor(
    private readonly prismaService: PrismaService
  ){}

  async create(createDriverInfoDto: DriverInfo) {
    try {
      return this.prismaService.driverInfo.create({ data: {...createDriverInfoDto} });
    } catch (error) {
      throw new HttpException('Error Created DriverInfo', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      return this.prismaService.driverInfo.findMany();
    } catch (error) {
      throw new HttpException('Error getAll Definition', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getById(id: number) {
    try {
      const driverInfoId = await this.prismaService.driverInfo.findUnique({ where: {id} });
      if(!driverInfoId){
        throw new HttpException('DriverInfo Not Found', HttpStatus.NOT_FOUND);
      }
      return driverInfoId;
    } catch (error) {
      throw new HttpException('Error getById driverIndo', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateDriverInfoDto: DriverInfo) {
    try {
      const driverInfoId = await this.prismaService.driverInfo.findUnique({ where: {id} });
      if(!driverInfoId){
        throw new HttpException('DriverInfo Not Found', HttpStatus.NOT_FOUND);
      } 
      return this.prismaService.driverInfo.update({ where: {id}, data: {...updateDriverInfoDto} });
    } catch (error) {
      if(error instanceof HttpException){
        throw error;
      }
      throw new HttpException('Error updated order', HttpStatus.BAD_REQUEST)
    }
  }

  async delete(id: number) {
    try {
      const driverInfoId = await this.prismaService.driverInfo.findUnique({ where: {id} });
      if(!driverInfoId){
        throw new HttpException('DriverInfo Not Found', HttpStatus.NOT_FOUND);
      }
      return driverInfoId;
    } catch (error) {
      if(error instanceof HttpException){
        throw error;
      }
      throw new HttpException('Error deleted DriverInfo', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
