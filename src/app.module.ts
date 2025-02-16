import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsController } from './jobs/jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsService } from './jobs/jobs.service';
import { JobsModule } from './jobs/jobs.module';
import { Jobs } from './entities/jobs.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'admin123',
      database: 'lowker',
      entities: [Jobs],
      synchronize: true,
      autoLoadEntities: true, // Ensure this is true
    }),
    JobsModule,
  ],
  controllers: [AppController, JobsController],
  providers: [AppService],
})
export class AppModule {}
