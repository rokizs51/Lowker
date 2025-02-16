import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Jobs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id : number;

  @Column()
  company : string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  experience: number;

  @Column()
  education: string;

  @Column()
  salary: string;

  @Column()
  job_type: string;

  @Column()
  age : string

  @Column()
  work_schedule: string;

  @Column()
  location: string;

  @Column()
  gender: number;
  
  @Column()
  isActive : boolean;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
