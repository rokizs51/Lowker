import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Jobs } from './jobs.entity';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class JobCategory{
    @PrimaryGeneratedColumn()
    id : number ;

    @Column()
    name : string;

    @OneToMany(() => Jobs, (job) => job.job_category)
    jobs: Jobs[];

    @UpdateDateColumn()
    updated_at: Date;

    @CreateDateColumn()
    created_at: Date;
}


export class JobCategoryModel {
    @IsString()
    @IsNotEmpty()
    name: string;
}