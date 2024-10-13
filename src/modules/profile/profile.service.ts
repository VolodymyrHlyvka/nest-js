import { Injectable } from '@nestjs/common';
import { User } from '../auth/user.entity';
import { Profile } from './profile.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileEntity: Repository<Profile>,
  ) {}

  async getProfile(id: string, user: User) {
    const result = await this.profileEntity.findOne({
      where: { id: id as any, user },
      relations: {
        user: true,
      },
    });
    return result;
  }
}
