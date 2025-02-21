import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CompanyService } from "./company.service";
import { CompanyModel } from "src/entities/company.entity";

@Controller("company")
export class CompanyController{
    constructor(
        private readonly companyService : CompanyService
    ){}

    @Get()
    async findAll(){
        return await this.companyService.findAll()
    }


    @Get(':id')
    async findOne(@Param() id: number){
        return await this.companyService.findOne(id)
    }

    @Post()
    async createCompany(@Body() companyModel : CompanyModel){
        return await this.companyService.createCompany(companyModel)
    }

    @Put(':id')
    async updateCompany(@Param('id') id: number, @Body() companyModel : CompanyModel){
        return await this.companyService.updateCompany(id, companyModel)
    }

    @Delete(':id')
    async deleteCompany(@Param('id') id: number){
        return await this.companyService.deleteCompany(id)
    }
}