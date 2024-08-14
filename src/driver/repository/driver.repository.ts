import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Driver } from "@prisma/client";

@Injectable()
export class DriverRepository {
    constructor(
        private readonly prisma: PrismaService,
    ){}
    
    async create( data: any): Promise<Driver>{
        return this.prisma.driver.create({ data: {...data} });
    }

    async findById(id: number): Promise<Driver | null>{
        return this.prisma.driver.findUnique({ where: {id} });
    }

    async findAll(){
        return await this.prisma.driver.findMany()
    }

    async update(id: number, updateData: any): Promise<Driver>{
        return this.prisma.driver.update({ where: {id}, data: {...updateData}})
    }

    async delete(id: number): Promise<Driver>{
        return this.prisma.driver.delete({ where: {id} });
    }
}