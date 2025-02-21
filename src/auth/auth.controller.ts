import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModel } from 'src/entities/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    // @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() UserModel: Record<string, any>) {
    return this.authService.signIn(UserModel.username, UserModel.password);
  }
  @Post('signup')
    signUp(@Body() UserModel: {password: string, email: string}) {
    return this.authService.signUp(UserModel.password, UserModel.email);
    }
}
