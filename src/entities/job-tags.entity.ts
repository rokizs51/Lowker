import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Jobs } from './jobs.entity';

@Entity()
export class JobTag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Jobs, (job) => job.tags)
  jobs: Jobs[];
}