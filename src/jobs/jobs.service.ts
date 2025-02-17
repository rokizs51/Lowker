import { Injectable, NotFoundException } from '@nestjs/common';
import {  CreateJobModel, Jobs } from '../entities/jobs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobCategory } from '../entities/jobs-category.entity';

@Injectable()
export class JobsService {
    constructor(
        @InjectRepository(Jobs)
        private jobRepository: Repository<Jobs>,
        @InjectRepository(JobCategory)
        private jobCategoryRepository: Repository<JobCategory>,
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

    async createJob(createJobModel : CreateJobModel ) : Promise<Jobs> {
        const { job_category, ...jobData } = createJobModel;
        const jobCategory = await this.jobCategoryRepository.findOneOrFail({ where: { id: job_category } });
    
        const job = this.jobRepository.create({
            ...jobData,
            job_category: jobCategory,
        });
        return await this.jobRepository.save(job);
    }

    async updateJob(id: number, updateJobDto: Partial<CreateJobModel>): Promise<Jobs> {
        const job = await this.jobRepository.findOne({ where: { id } });
        if (!job) {
            throw new NotFoundException(`Job with ID ${id} not found`);
        }

        if (updateJobDto.job_category) {
            const jobCategory = await this.jobCategoryRepository.findOneOrFail({ where: { id: updateJobDto.job_category } });
            job.job_category = jobCategory;
        }

        Object.assign(job, updateJobDto);
        return await this.jobRepository.save(job);
    }

    async deleteJob(id: number): Promise<void> {
        const job = await this.jobRepository.findOne({ where: { id } });
        if (!job) {
            throw new NotFoundException(`Job with ID ${id} not found`);
        }
        await this.jobRepository.remove(job);
    }
}
