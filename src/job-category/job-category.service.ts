import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JobCategory, JobCategoryModel } from "src/entities/jobs-category.entity";
import { Repository } from "typeorm";

@Injectable()
export class JobCategoryService {
    constructor(
        @InjectRepository(JobCategory)
        private jobCategoryRepository : Repository<JobCategory>,
    ){}

    async findAll(): Promise<JobCategory[]>{
        return await this.jobCategoryRepository.find()
    }

    async findOne(id : number) : Promise<JobCategory>{
        const category =  await this.jobCategoryRepository.findOne({where : {id}})
        if (!category){
            throw new NotFoundException(`category with id ${id} cannot be found`)
        }
        return category
    }

    async create(data: Partial<JobCategory>): Promise<JobCategory> {
        const existing = await this.jobCategoryRepository.findOne({where : {name : data.name}})
        if (existing){
            throw new BadRequestException(`category with name ${data.name} already exists`)
        }
        const category = this.jobCategoryRepository.create(data);
        return await this.jobCategoryRepository.save(category);
    }

    // async createRange(data: JobCategoryModel[]): Promise<JobCategory[]> {
    //     const category = this.jobCategoryRepository.create(data);
    //     return await this.jobCategoryRepository.save(category);
    // }

    async update(id: number, data: JobCategoryModel): Promise<JobCategory> {
        const category = await this.findOne(id); // Check if exists
        if (!category) {
            throw new NotFoundException(`category with id ${id} cannot be found`)
        }
        await this.jobCategoryRepository.update(id, data);
        return category;
    }

    async remove(id: number): Promise<Object> {
        const category = await this.findOne(id);
        if (!category) {
            throw new NotFoundException(`category with id ${id} cannot be found`) 
        }
        await this.jobCategoryRepository.remove(category);
        const removeMessage = {
            message : `category with id ${id} has been deleted`,
            category : category
        }
        return removeMessage
    }
}