import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Login into system' })
  @ApiResponse({ status: 200, description: 'Login successfully.' })
  login(@Body() loginDto: AuthDto) {
    return this.authService.login(loginDto);
  }

  @Post('/register')
  @ApiOperation({ summary: 'Register user into system' })
  @ApiResponse({ status: 200, description: 'Register successfully.' })
  register(@Body() loginDto: AuthDto) {
    return this.authService.register(loginDto);
  }
}
