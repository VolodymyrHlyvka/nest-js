import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/modules/auth/get-user.decorator';
import { User } from 'src/modules/auth/user.entity';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@UseGuards(AuthGuard())
@ApiTags('Tasks')
@Controller('tasks')
@UseInterceptors(CacheInterceptor)
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  @Header('Cache-Control', 'max-age=3600')
  @CacheKey('get_all_tasks')
  @CacheTTL(36)
  getAllTasks(
    @Query('page', ParseIntPipe) page: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
    @Query() filters: FilterTaskDto,
    @GetUser() user: User,
  ) {
    return this.taskService.getAllTasks({ ...filters, page, pageSize }, user);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task created successfully.' })
  createTask(@Body() createTaskDto: CreateTaskDTO, @GetUser() user: User) {
    return this.taskService.createTask(createTaskDto, user);
  }

  // @Put('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  //   @GetUser() user: User,
  // ) {
  //   return this.taskService.updateTaskStatus(id, updateTaskStatusDto, user);
  // }

  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: User) {
    return this.taskService.getTaskById(id, user);
  }

  // @Delete('/:id')
  // deleteTaskById(@Param('id') id: string, @GetUser() user: User) {
  //   return this.taskService.deleteTaskById(id, user);
  // }
}
