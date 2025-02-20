import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobCategoryService } from './job-category.service';
import { JobCategory } from 'src/entities/jobs-category.entity';
import { JobCategoryController } from './job-category.controller';

@Module({
    imports: [TypeOrmModule.forFeature([JobCategory])],
    controllers: [JobCategoryController],
    providers: [JobCategoryService],
    exports: [JobCategoryService]
  })
export class JobsCategoryModule {}
