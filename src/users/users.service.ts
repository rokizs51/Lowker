
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { UserModel } from '../entities/user.entity';

@Injectable()
export class UsersService {
    constructor( 
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}


  async findOne(email: string): Promise<User | undefined> {
    const isExist = await this.userRepository.findOne({where:[{email: email}] });
    if  (!isExist) {
       throw new NotFoundException();
    }
    return isExist as User;
  }

  async createUser(userData:{ email: string, password: string}) {

    const newUser = this.userRepository.create(userData);
    if  (!newUser) {
        throw new BadRequestException('failed create User, please check your request')
    }
    await this.userRepository.save(newUser);
    return  {
      // TO DO : use 'generated-id'
      email : newUser.email,
      password: newUser.password
    };
  }
}
