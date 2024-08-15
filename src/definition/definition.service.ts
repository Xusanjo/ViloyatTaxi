import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Definition } from '@prisma/client';

@Injectable()
export class DefinitionService {
  constructor(
    private readonly prismaService: PrismaService
  ){}

  async create(createDefinitionDto: Definition) {
    try {
      return this.prismaService.definition.create({ data: {...createDefinitionDto} })
    } catch (error) {
      throw new HttpException('Error Created Definition', HttpStatus.BAD_REQUEST);
    }
  }

  async getAll() {
    try {
      return this.prismaService.definition.findMany()
    } catch (error) {
      throw new HttpException('Error getAll Definition', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getById(id: number) {
    try {
      const definition = await this.prismaService.addres.findUnique({ where: {id} });
      if(!definition){
        throw new HttpException('Defintion Not Found', HttpStatus.NOT_FOUND);
      }
      return definition;
    } catch (error) {
      throw new HttpException('Error getById Definition', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(id: number, updateDefinitionDto: Definition) {
    try {
      const definition =  await this.prismaService.definition.findUnique({ where: {id},  });
      if(!definition){
        throw new HttpException('Definition updated Not Found', HttpStatus.NOT_FOUND);
      }
      return definition;
    } catch (error) {
      if(error instanceof HttpException){
        throw error;
      }
      throw new HttpException('Error Updated Definition', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number) {
    try {
      const definitionId = await this.prismaService.definition.findUnique({ where: {id} });
      if(!definitionId){
        throw new HttpException('Definition Deleted Not Found', HttpStatus.NOT_FOUND);
      }
      return definitionId;
    } catch (error) {
      if(error instanceof HttpException){
        throw error
      }
      throw new HttpException('Error deleted Defintion', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
