import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JobRequestModel, Jobs } from '../entities/jobs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { JobCategory } from '../entities/jobs-category.entity';
import { JobTag } from 'src/entities/job-tags.entity';

@Injectable()
export class JobsService {
    constructor(
        @InjectRepository(Jobs)
        private jobRepository: Repository<Jobs>,
        @InjectRepository(JobCategory)
        private jobCategoryRepository: Repository<JobCategory>,
        @InjectRepository(JobTag)
        private jobTagRepository : Repository<JobTag>
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

    async createJob(jobRequest : JobRequestModel ) : Promise<Jobs> {
        const { tag_ids, job_category, ...jobData } = jobRequest;
        const jobCategory = await this.jobCategoryRepository.findOneOrFail({ where: { id: job_category } });

        if (!jobCategory) {
            throw new BadRequestException(`job category with ID ${job_category} not found`);
        }

        // Validate all tags exist
        const existingTags = await this.jobTagRepository.findBy({ 
            id: In(tag_ids) 
        });
        if (existingTags.length !== tag_ids.length) {
            const foundTagIds = existingTags.map(tag => tag.id);
            const missingTagIds = tag_ids.filter(id => !foundTagIds.includes(id));
            throw new BadRequestException(`Tags with IDs ${missingTagIds.join(', ')} not found`);
        }
        
    
        const job = this.jobRepository.create({
            ...jobData,
            job_category: jobCategory,
            tags : existingTags,
        });

        if (!job) {
            throw new BadRequestException('failed create job, please check your request')
        }
        return await this.jobRepository.save(job);
    }

    async updateJob(id: number, jobRequest: Partial<JobRequestModel>): Promise<Jobs> {
        const job = await this.jobRepository.findOne({ where: { id } });
        if (!job) {
            throw new NotFoundException(`Job with ID ${id} not found`);
        }
        
        if (jobRequest.job_category) {
            const jobCategory = await this.jobCategoryRepository.findOneOrFail({ where: { id: jobRequest.job_category } });
            job.job_category = jobCategory;
        }

        if (jobRequest.tag_ids) {
            const existingTags = await this.jobTagRepository.findBy({ 
                id: In(jobRequest.tag_ids) 
            });
            if (existingTags.length !== jobRequest.tag_ids.length) {
                const foundTagIds = existingTags.map(tag => tag.id);
                const missingTagIds = jobRequest.tag_ids.filter(id => !foundTagIds.includes(id));
                throw new BadRequestException(`Tags with IDs ${missingTagIds.join(', ')} not found`);
            }
            job.tags = existingTags;
        }

        Object.assign(job, jobRequest);
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
