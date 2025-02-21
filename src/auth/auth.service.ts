import { Injectable, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { promises } from 'dns';
import { STATUS_CODES } from 'http';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService : UsersService,
        private readonly jwtService : JwtService,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async signIn(username : string, pass : string) : Promise<Promise<any>> {
        const user = await this.usersService.findOne(username);
        if  (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload = {
            sub : user.id,
            username : user.email
        }
        return {
            access_token : await this.jwtService.signAsync(payload)
        };
    }

    async signUp(password : string, email: string){
        const existingUser = await this.userRepository.findOne({where:[{email: email}] });;
        if (existingUser) {
            throw new UnauthorizedException('User already exists');
        }

        const newUser = await this.usersService.createUser({password, email});
        if (newUser){
            return{
                statusCode : HttpStatus.CREATED,
                message: 'User registered successfully',
                // data:{
                //     email: newUser.email,
                //     access_token: await this.jwtService.signAsync({email: newUser.email, password: newUser.password})
                // }
            }
        }

        return{
            statusCode : HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error',
            // data:{
            //     email: newUser.email,
            //     access_token: await this.jwtService.signAsync({email: newUser.email, password: newUser.password})
            // }
        }
        // const payload = {
        //     email : newUser.email,
        //     password : newUser.password
        // }

        // return {
        //     access_token : await this.jwtService.signAsync(payload)
        // };
    }
}
