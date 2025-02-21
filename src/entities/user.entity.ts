import { Role } from "../etc/enums";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, OneToOne } from "typeorm";
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator';
import { Company } from "./company.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({nullable : true})
    @IsNotEmpty()
    first_name: string;

    @Column({nullable : true})
    @IsNotEmpty()
    last_name: string;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column()
    @Exclude()
    @MinLength(8)
    password: string;

    @Column({type: 'enum', enum: Role, default: Role.JOB_SEEKER})
    role: Role;

    @Column({ default: false })
    is_email_verified: boolean;

    @Column({ nullable: true })
    email_verification_token: string;

    @Column({ nullable: true })
    password_reset_token: string;

    @Column({ nullable: true })
    last_login: Date;

    @Column({ default: true })
    is_active: boolean;

    @Column({ nullable: true })
    profile_picture: string;

    @Column({ nullable: true })
    phone_number: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(() => Company, company => company.user)
    company: Company;
}


export class UserModel {
    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsEmail()
    email: string;

    @MinLength(8)
    password: string;

    @IsOptional()
    role?: Role;

    @IsOptional()
    phone_number?: string;

    @IsOptional()
    profile_picture?: string;
}