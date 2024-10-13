import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../auth/user.entity';
import { Task } from '../task/task.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  gender: string;

  @Column()
  photo: string;

  @OneToOne(() => User, (user) => user.profile, { eager: false }) // specify inverse side as a second parameter
  user: User;

  @OneToMany(() => Task, (task) => task.profile, {
    eager: false,
    cascade: true,
  })
  tasks: Task[];
}
