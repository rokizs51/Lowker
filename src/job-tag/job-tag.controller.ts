import { Controller, Get, Post, Delete, Param, Body, Put } from '@nestjs/common';
import { JobTagService } from './job-tag.service';
import { JobTag } from 'src/entities/job-tags.entity';

@Controller('job-tags')
export class JobTagController {
  constructor(private readonly jobTagService: JobTagService) {}

  @Get()
  async findAll(): Promise<JobTag[]> {
    return this.jobTagService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<JobTag | null> {
    return this.jobTagService.findOne(id);
  }

  @Post()
  async create(@Body() body: { name: string }): Promise<JobTag> {
    return this.jobTagService.create(body.name);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: { name: string }): Promise<JobTag> {
    return this.jobTagService.update(id, body.name);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.jobTagService.delete(id);
  }
}
