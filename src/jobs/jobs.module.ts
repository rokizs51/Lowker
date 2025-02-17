import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { Jobs } from '../entities/jobs.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Jobs])],
    controllers: [JobsController],
    providers: [JobsService],
    exports: [JobsService, "src/etc/enums.ts"]
  })
export class JobsModule {}
