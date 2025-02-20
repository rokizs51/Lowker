import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobTag } from 'src/entities/job-tags.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JobTagService {
  constructor(
    @InjectRepository(JobTag)
    private readonly jobTagRepository: Repository<JobTag>,
  ) {}

  async findAll(): Promise<JobTag[]> {
    return this.jobTagRepository.find();
  }

  async findOne(id: number): Promise<JobTag> {
    const tag = await this.jobTagRepository.findOne({ where: { id } });
    if (!tag) {
      throw new NotFoundException('Tag not found');
    }
    return tag
  }

  async create(name: string): Promise<JobTag> {
    const tag = await this.jobTagRepository.findOne({ where: { name } });
    if (tag) {
      throw new BadRequestException(`Tag with name ${name} already exists`);
    }
    const newTag = this.jobTagRepository.create({ name });
    return this.jobTagRepository.save(newTag);
  }

  async update(id : number, name: string): Promise<JobTag> {
    const tag = await this.jobTagRepository.findOne({ where: { id } });
    if (!tag) {
      throw new NotFoundException(`Tag with id ${id} not found`);
    }
    tag.name = name;
    return this.jobTagRepository.save(tag);
  }

  async delete(id: number): Promise<void> {
    await this.jobTagRepository.delete(id);
  }
}
