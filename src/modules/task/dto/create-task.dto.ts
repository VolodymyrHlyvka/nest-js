import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDTO {
  @IsNotEmpty()
  @ApiProperty({ description: 'Title of the task' })
  title: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Description of the task' })
  description: string;
}
