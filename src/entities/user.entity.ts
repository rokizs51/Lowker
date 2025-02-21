import { Role } from "../etc/enums";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    @IsNotEmpty()
    first_name: string;

    @Column()
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

    // Virtual property (not stored in database)
    @Column({ select: false, insert: false, update: false })
    get full_name(): string {
        return `${this.first_name} ${this.last_name}`;
    }
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