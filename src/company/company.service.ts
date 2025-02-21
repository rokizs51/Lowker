import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Company, CompanyModel } from "src/entities/company.entity";
import { Repository } from "typeorm";

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company)
        private readonly companyRepository : Repository<Company>
    ){}

    async findAll() : Promise<Company[]>{
        return await this.companyRepository.find()
    }

    async findOne(id: number) : Promise<Company>{
        const company = await this.companyRepository.findOne({
            where : {
                id : id
            }
        })
        if (!company){
            throw new NotFoundException(`Company with id ${id} not found`)
        }
        return company
    }

    async createCompany(companyModel: CompanyModel) : Promise<Company>{
        const isExist = this.companyRepository.findOne({where: {name: companyModel.name}})
        if (!isExist){
            throw new BadRequestException(`Company with name ${companyModel.name} already exists`)
        }
        const company = await this.companyRepository.create(companyModel)
        return await this.companyRepository.save(company)
    }

    async updateCompany(id : number, companyModel: CompanyModel) : Promise<Company> {
        const company = await this.companyRepository.findOne({where: {id: id}})
        if (!company){
            throw new NotFoundException(`Company with id ${id} not found`)
        }
        return this.companyRepository.save(companyModel)
    }


    async deleteCompany(id : number) : Promise<void> {
        const company = await this.companyRepository.findOne({where: {id: id}})
        if (!company){
            throw new NotFoundException(`Company with id ${id} not found`)
        }
        await this.companyRepository.delete(id)
    }
}