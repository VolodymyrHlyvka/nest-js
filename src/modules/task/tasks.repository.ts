import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { User } from 'src/modules/auth/user.entity';
import { Category } from '../category/category.entity';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    @InjectRepository(Category)
    private readonly categoryEntity: Repository<Category>,
  ) {}

  async getAllTasks(
    { page, pageSize, search, status }: FilterTaskDto,
    user: User,
  ) {
    const query = this.taskRepository.createQueryBuilder('task');
    query.where({ profile: user.profile });

    if (status) {
      query.andWhere('task.status = :status', { status: status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    if (page !== undefined) {
      if (pageSize) {
        query.skip(page * pageSize).take(pageSize);
      } else {
        query.skip(page * 10).take(10);
      }
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDTO, user: User) {
    const newTask = this.taskRepository.create({
      ...createTaskDto,
      status: TaskStatus.Open,
      profile: user.profile,
    });

    // const category = await this.categoryEntity.findOneBy({ title: 'test' });

    // if (!category) {
    //   const newCategory = this.categoryEntity.create({
    //     title: 'New Catetory',
    //     text: 'New category description',
    //   });

    //   await this.categoryEntity.save(newCategory);
    //   newTask.categories = [newCategory];
    // }

    await this.taskRepository.save(newTask);
    return newTask;
  }
}
