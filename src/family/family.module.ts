import { Module } from '@nestjs/common';
import { FamilyService } from './family.service';
import { FamilyController } from './family.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [FamilyService, PrismaService],
  controllers: [FamilyController]
})
export class FamilyModule {}
