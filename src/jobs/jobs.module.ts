import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { Jobs } from '../entities/jobs.entity';
import { JobCategory } from 'src/entities/jobs-category.entity';
import { JobTag } from 'src/entities/job-tags.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Jobs, JobCategory, JobTag])],
    controllers: [JobsController],
    providers: [JobsService],
    exports: [JobsService]
  })
export class JobsModule {}
