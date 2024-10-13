import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from '../profile/profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Profile, { eager: false, cascade: true })
  @JoinColumn()
  profile: Profile;
}
