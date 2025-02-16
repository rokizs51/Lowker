import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Jobs } from '../entities/jobs.entity';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-jobs.dto';

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
    createJob(@Body() CreateJobDto : CreateJobDto) {
        this.jobsService.createJob(CreateJobDto)
    } 
}

