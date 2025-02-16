import { Injectable, NotFoundException } from '@nestjs/common';
import { Jobs } from '../entities/jobs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateJobDto } from './dto/create-jobs.dto';

@Injectable()
export class JobsService {
    constructor(
        @InjectRepository(Jobs)
        private jobRepository: Repository<Jobs>,
      ) {}
    async findAll(): Promise<Jobs[]>{
        return await this.jobRepository.find()
    }

    async findOne(id : number) : Promise<Jobs> {
        const job = await this.jobRepository.findOne({where : {id}})
        if (!job) {
            throw new NotFoundException(`job with ID ${id} not found`)
        }

        return job
    }

    async createJob(createJobDto : CreateJobDto ) : Promise<Jobs> {
        const job = this.jobRepository.create(createJobDto)
        job.user_id = 1
    
        return await this.jobRepository.save(job)
    }
}
