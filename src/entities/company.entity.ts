import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty, IsEmail, IsUrl, IsPhoneNumber, isNotEmpty, IsOptional } from 'class-validator';
import { Jobs } from './jobs.entity';
import { User } from './user.entity';

@Entity()
export class Company {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    @IsNotEmpty()
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ nullable: true })
    logo: string;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column({ nullable: true })
    @IsPhoneNumber()
    phone: string;

    @Column({ nullable: true })
    @IsUrl()
    website: string;

    @Column({ nullable: true})
    address: string;

    @Column({ nullable: true })
    city: string;

    @Column({ nullable: true })
    state: string;

    @Column({ default: 'Indonesia' })
    country: string;

    @Column({ nullable: true })
    postal_code: string;

    @Column({ nullable: true })
    industry: string;

    @Column({ nullable: true })
    company_size: string;

    @Column({ default: true })
    is_active: boolean;

    @Column({ nullable: true })
    linkedin_url: string;

    @OneToMany(() => Jobs, job => job.company)
    jobs: Jobs[];

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export class CompanyModel {
    @IsNotEmpty()
    name : string;

    @IsOptional()
    description?: string;

    @IsOptional()
    logo?: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsPhoneNumber()
    @IsOptional()
    phone?: string;

    @IsUrl()
    @IsOptional()
    website?: string;

    @IsOptional()
    address?: string;

    @IsOptional()
    city?: string;

    @IsOptional()
    state?: string;

    @IsOptional()
    country?: string;

    @IsOptional()
    postal_code?: string;

    @IsOptional()
    industry?: string;

    @IsOptional()
    company_size?: string;

    @IsOptional()
    @IsUrl()
    linkedin_url?: string;

    @IsNotEmpty()
    user_id: number;
}