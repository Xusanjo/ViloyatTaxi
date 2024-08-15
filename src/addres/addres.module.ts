import { Module } from '@nestjs/common';
import { AddresService } from './addres.service';
import { AddresController } from './addres.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AddresController],
  providers: [AddresService, PrismaService],
  exports: [AddresService]
})
export class AddresModule {}
