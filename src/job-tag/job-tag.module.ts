import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobTag } from "src/entities/job-tags.entity";
import { JobTagService } from "./job-tag.service";
import { JobTagController } from "./job-tag.controller";


@Module({
  imports: [TypeOrmModule.forFeature([JobTag])],
  controllers: [JobTagController],
  providers: [JobTagService],
  exports: [JobTagService],
})
export class JobTagModule {}
