import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Addres } from "@prisma/client";

@Injectable()
export class AddresService {
  constructor(
    private readonly prismaService: PrismaService
  ){}

  async create(createAddreDto: Addres) {
    try {
      return this.prismaService.addres.create({ data: {...createAddreDto} });
    } catch (error) {
      throw new HttpException(`Error creating address: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async getAll() {
    try {
      return this.prismaService.addres.findMany();
    } catch (error) {
      throw new HttpException('Error getAll Address', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getById(id: number) {
    try {
      const address = await this.prismaService.addres.findUnique({
        where: {id}
      });
      if(!address){
        throw new HttpException("address Not Found", HttpStatus.NOT_FOUND);
      }
      return address
    } catch (error) {
      throw new HttpException('error GetById address', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateAddreDto: Addres) {
    try {
      const address = await this.prismaService.addres.findUnique({ where: {id} })
      if(!address){
        throw new HttpException('Addres updated Not Found', HttpStatus.NOT_FOUND); 
      }
      return this.prismaService.addres.update({
        where: {id},
        data: {...updateAddreDto}
      })
    } catch (error) {
      if(error instanceof HttpException){
        throw error;
      }
      throw new HttpException('Error Updated Address', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number) {
    try {
      const address = await this.prismaService.addres.findUnique({ where: {id} });
      if(!address){
        throw new HttpException('Address Deleted Not Found', HttpStatus.NOT_FOUND);
      }
      return this.prismaService.addres.delete({ where: {id} })
    } catch (error) {
      if(error instanceof HttpException){
        throw error;
      }
      throw new HttpException('Error deleted address', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
