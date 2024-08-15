import { Module } from '@nestjs/common';
import { DefinitionService } from './definition.service';
import { DefinitionController } from './definition.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DefinitionController],
  providers: [DefinitionService, PrismaService],
  exports: [DefinitionService]
})
export class DefinitionModule {}
