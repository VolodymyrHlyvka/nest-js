import {
  Column,
  Entity,
  Index,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { Profile } from '../profile/profile.entity';
import { Category } from '../category/category.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne(() => Profile, (profile) => profile.tasks, { eager: false })
  profile: Profile;

  @ManyToMany(() => Category, (question) => question.tasks)
  categories: Category[];

  // @OneToMany(() => SubTask, (subTask) => subTask.task, { eager: true })
  // subTasks: SubTask[];
}
