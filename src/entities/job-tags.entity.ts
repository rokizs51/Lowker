import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Jobs } from './jobs.entity';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class JobTag {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Jobs, (job) => job.tags)
  jobs: Jobs[];
}


export class JobTagModel {
    @IsString()
    @IsNotEmpty()
    name: string;
}