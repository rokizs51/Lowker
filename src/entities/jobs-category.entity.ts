import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Jobs } from './jobs.entity';

@Entity()
export class JobCategory{
    @PrimaryGeneratedColumn()
    id : number ;

    @Column()
    job_id : number ;

    @Column()
    name : string;

    @OneToMany(() => Jobs, (job) => job.job_category)
    jobs: Jobs[];

    @Column()
    createdAt : Date;

    @Column()
    updatedAt : Date;
}