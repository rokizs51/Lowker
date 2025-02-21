
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './constant';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';


@Module({
  imports: [UsersModule,
    JwtModule.register({
      global : true,
      secret: JWT_SECRET.secret,
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([User])
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
