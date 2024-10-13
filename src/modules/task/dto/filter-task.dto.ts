import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class FilterTaskDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  pageSize?: number;

  @IsOptional()
  search: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
