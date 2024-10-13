import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { FilterTaskDto } from './dto/filter-task.dto';
import { User } from 'src/modules/auth/user.entity';

@Injectable()
export class TasksService {
  private logger = new Logger('TasksService');
  constructor(
    @InjectRepository(Task)
    private readonly taskEntity: Repository<Task>,
    private taskRepository: TaskRepository,
  ) {}

  getAllTasks(filtersDto: FilterTaskDto, user: User) {
    this.logger.log(
      `User ${user.email} retriving all tasks, check cache validation`,
    );
    return this.taskRepository.getAllTasks(filtersDto, user);
  }

  async createTask(createTaskDto: CreateTaskDTO, user: User) {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  // async updateTaskStatus(
  //   id: string,
  //   { status }: UpdateTaskStatusDto,
  //   user: User,
  // ) {
  //   const result = await this.getTaskById(id, user);
  //   result.status = status;
  //   await this.taskEntity.save(result);
  //   return result;
  // }

  async getTaskById(id: string, user: User) {
    const result = await this.taskEntity.findOne({
      where: {
        id,
        profile: {
          user,
        },
      },
      relations: {
        profile: true,
      },
    });
    if (!result) {
      throw new NotFoundException(`Task with ${id} not found`);
    }
    return result;
  }

  // async deleteTaskById(id: string, user: User) {
  //   const result = await this.getTaskById(id, user);
  //   this.taskEntity.delete({ id: result.id });
  // }
}
