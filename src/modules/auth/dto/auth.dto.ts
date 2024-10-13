import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

const password_regex = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export class AuthDto {
  @IsNotEmpty()
  @MinLength(4)
  @IsEmail()
  @ApiProperty({ description: 'Email' })
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @Matches(password_regex, { message: 'Password is not strong enough' })
  @ApiProperty({ description: 'Password' })
  password: string;
}
