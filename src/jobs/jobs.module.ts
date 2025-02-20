import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { Jobs } from '../entities/jobs.entity';
import { JobCategory } from 'src/entities/jobs-category.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Jobs, JobCategory])],
    controllers: [JobsController],
    providers: [JobsService],
    exports: [JobsService]
  })
export class JobsModule {}
