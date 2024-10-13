import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Profile } from '../profile/profile.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userEntity: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileEntity: Repository<Profile>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: AuthDto) {
    const result = await this.getUserByEmail(loginDto.email);
    const isPasswordMatch = await bcrypt.compare(
      loginDto.password,
      result.password,
    );
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Please check your login credentials');
    }
    const payload = { email: result.email };
    const accessToken = this.jwtService.sign(payload);
    return { token: accessToken, user: result };
  }

  async register(registerDto: AuthDto) {
    const result = await this.userEntity.findOneBy({
      email: registerDto.email,
    });
    if (result) {
      throw new ConflictException(
        `User with email ${result.email} already exist`,
      );
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(registerDto.password, salt);
    const newUser = this.userEntity.create({
      ...registerDto,
      password: hashedPassword,
    });

    const profile = this.profileEntity.create();
    profile.gender = 'male';
    profile.photo = 'me.jpg';
    await this.profileEntity.save(profile);

    newUser.profile = profile;

    await this.userEntity.save(newUser);

    return newUser;
  }

  //TODO: move to authRepository
  async getUserByEmail(email: string) {
    const result = await this.userEntity.findOne({
      where: { email },
      relations: {
        profile: true,
      },
    });
    if (!result) {
      throw new UnauthorizedException('Please check your login credentials');
    }
    return result;
  }
}
