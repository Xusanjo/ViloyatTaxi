import { Injectable } from "@nestjs/common";
import { UpdateUserDto } from "../../common/dto/update-user.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserRepository {
    constructor (
        private readonly prisma: PrismaService
    ){}

    async findByIdEmail (email: string){
        return await this.prisma.user.findUnique({ where: {email} });
    }

    async create(newUser: any){
        return await this.prisma.user.create({ data: {...newUser} });
    }

    async createOtp(newOtp){
        await this.prisma.otp.create({ data: {...newOtp} });
    }

    async findOneOtp(userId: number){
        return await this.prisma.otp.findUnique({ where: {userId } })
    }
    
    async findByIdUser(id: number){
        return await this.prisma.user.findUnique({ where: {id} })
    }

    async deleteOtp(id: number){
        await this.prisma.otp.delete({ where: {id} })
    }

    async updateUserRole(id: number){
        await this.prisma.user.update({
            where: {id},
            data: {role: 'ADMIN'},
        });
    } 

    async createAndUpdateToken(refreshToken: {
        userId: number;
        refresh: string;
    }){
        const { userId, refresh } = refreshToken;
        const existToken = await this.prisma.refresh.findUnique({
            where: { userId },
        });

        if( !existToken ){
            return await this.prisma.refresh.update({
                where: { userId },
                data: { refresh },
            });
        }
        return await this.prisma.refresh.create({ data: {userId, refresh} });
    }

    async deleteToken(userId: number){
        await this.prisma.refresh.delete({ where: { userId } });
    }

    async findAllUsers(){
        return await this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                phone: true,
                email: true,
                password: true,
                role: true,
                token: true,
                isActive: true
            },
        });
    }

    async findOneUser(id: number){
        return await this.prisma.user.findMany({
            where: {id},
            select: {
                id: true,
                name: true,
                phone: true,
                email: true,
                password: true,
                role: true,
                token: true,
                isActive: true,
            },
        });
    }

    async updateUser(id: number, user: UpdateUserDto) {
        await this.prisma.user.update({ where: {id}, data: {...user} });
        return await this.findOneUser(id);
    }

    async deleteUser(id: number){
        await this.prisma.user.delete({ where: {id} });
    }
    async findOneToken(refresh: string){
        return await this.prisma.refresh.findFirst({ where: { refresh } });
    }
}