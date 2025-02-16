import { IsNotEmpty, IsString, IsNumber, IsOptional, IsBoolean, isDate, IsDate } from 'class-validator';

export class CreateJobDto {
  @IsString()
  company: string;
  
  @IsString()
  title: string;
  
  @IsString()
  description: string;
  
  @IsNumber()
  experience: number;
  
  @IsString()
  education: string;
  
  @IsString()
  salary: string;
  
  @IsString()
  job_type: string;
  
  @IsString()
  age: string;
  
  @IsString()
  work_schedule: string;
  
  @IsString()
  location: string;
  
  @IsNumber()
  gender: number;
  
  @IsBoolean()
  isActive: boolean;

}

