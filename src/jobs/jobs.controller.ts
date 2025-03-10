import { Body, Controller, Get, Param, Post, Patch, Delete } from '@nestjs/common';
import {  JobRequestModel, Jobs } from '../entities/jobs.entity';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService : JobsService){}

    @Get()
    findAll() {
        return this.jobsService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id :number){
        return this.jobsService.findOne(id)
    }

    @Post()
    createJob(@Body() createJobModel : JobRequestModel) {
            this.jobsService.createJob(createJobModel)
    }   

    @Patch(':id')
    updateJob(@Param('id') id: string, @Body() updateJobDto: Partial<JobRequestModel>) {
        return this.jobsService.updateJob(+id, updateJobDto);
    }

    @Delete(':id')
    deleteJob(@Param('id') id: string) {
        return this.jobsService.deleteJob(+id);
    }
}
