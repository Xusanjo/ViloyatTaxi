import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { DriverRepository } from './repository/driver.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [DriverController],
  providers: [DriverService, DriverRepository, PrismaService],
  exports: [DriverService, DriverRepository]
})
export class DriverModule {}
