import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskRepository } from './tasks.repository';
import { AuthModule } from 'src/modules/auth/auth.module';
import { Category } from '../category/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Category]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService, TaskRepository],
})
export class TasksModule {}
