import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsController } from './jobs/jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsService } from './jobs/jobs.service';
import { JobsModule } from './jobs/jobs.module';
import { Jobs } from './entities/jobs.entity';
import { JobCategory } from './entities/jobs-category.entity';
import { JobTag } from './entities/job-tags.entity';
import { JobsCategoryModule } from './job-category/job-category.module';
import { JobTagModule } from './job-tag/job-tag.module';
import { User } from './entities/user.entity';
import { Company } from './entities/company.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'admin123',
      database: 'lowker',
      entities: [Jobs, JobCategory, JobTag, User, Company],
      synchronize: false,
      autoLoadEntities: true, // Ensure this is true
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      migrationsRun: true
    }),
    JobsModule,
    JobsCategoryModule,
    JobTagModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
