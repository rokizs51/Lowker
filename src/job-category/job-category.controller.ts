import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { JobCategoryService } from "./job-category.service";
import {  JobCategory, JobCategoryModel } from "src/entities/jobs-category.entity";

@Controller('job-category')
export class JobCategoryController{
    constructor(private readonly jobCategoryService : JobCategoryService){}
    @Get()
    findAll(){
        return this.jobCategoryService.findAll()
    }
    
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.jobCategoryService.findOne(id);
    }

    @Post()
    create(@Body() createJobCategoryModel: JobCategoryModel) {
        return this.jobCategoryService.create(createJobCategoryModel);
    }

    // @Post()
    // createRange(@Body() createJobCategoryModel: JobCategoryModel[]) {
    //     return this.jobCategoryService.createRange(createJobCategoryModel);
    // }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateJobCategoryDto: JobCategoryModel) {
        return this.jobCategoryService.update(id, updateJobCategoryDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.jobCategoryService.remove(id);
    }
}