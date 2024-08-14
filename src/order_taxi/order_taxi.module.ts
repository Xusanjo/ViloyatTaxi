import { Module } from '@nestjs/common';
import { OrderTaxiService } from './order_taxi.service';
import { OrderTaxiController } from './order_taxi.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [OrderTaxiController, ],
  providers: [OrderTaxiService, PrismaService],
  exports: [OrderTaxiService]
})
export class OrderTaxiModule {}
