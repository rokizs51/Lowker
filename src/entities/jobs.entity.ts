import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsBoolean, isDate, IsDate, isNumber, IsEnum, IsObject, IsArray } from 'class-validator';
import {  JobGender, JobType } from '../etc/enums';
import { JobCategory } from './jobs-category.entity';
import { JobTag } from './job-tags.entity';




@Entity()
export class Jobs {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => JobCategory, (category) => category.jobs)
  job_category : JobCategory;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  experience: number;

  @Column()
  education: string;

  @Column({nullable : true})
  salary_min: number;

  @Column({nullable : true})
  salary_max: number;

  @Column({type : 'enum', enum: JobType})
  job_type: JobType;

  @Column()
  age : number

  @Column()
  work_schedule: string;

  @Column()
  location: string;

  @Column({type : 'enum', enum : JobGender})
  preferred_gender: JobGender;
  
  @Column()
  isActive : boolean;

  @ManyToMany(() => JobTag, (tag) => tag.jobs, { cascade: true })
  @JoinTable()
  tags: JobTag[];


  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;
}


export class JobRequestModel {
  @IsNumber()
  @IsNotEmpty()
  job_category: number;  // Changed from job_category to job_category_id for clarity

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  experience: number;

  @IsString()
  education: string;

  @IsNumber()
  salary_min: number;
  
  @IsNumber()
  salary_max: number;

  @IsEnum(JobType)
  job_type: JobType;

  @IsNumber()
  age: number;

  @IsString()
  work_schedule: string;

  @IsString()
  location: string;

  @IsEnum(JobGender)
  preferred_gender: JobGender;

  @IsBoolean()
  isActive: boolean;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  tag_ids: number[];  // New field for job tag IDs
}
