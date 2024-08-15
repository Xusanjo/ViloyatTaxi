import { Module } from '@nestjs/common';
import { DriverInfoService } from './driver-info.service';
import { DriverInfoController } from './driver-info.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DriverInfoController],
  providers: [DriverInfoService, PrismaService],
  exports: [DriverInfoService]
})
export class DriverInfoModule {}
