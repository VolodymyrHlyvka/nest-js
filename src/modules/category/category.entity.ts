import { Task } from 'src/modules/task/task.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToMany(() => Task, (task) => task.categories)
  @JoinTable()
  tasks: Task[];
}
