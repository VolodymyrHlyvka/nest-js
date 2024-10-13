import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get(':id')
  getProfile(@Param('id') id: string, @GetUser() user: User) {
    return this.profileService.getProfile(id, user);
  }
}
