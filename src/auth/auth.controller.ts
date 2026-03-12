import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from './dto/login-post.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/user-post-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async createUser(
    @Body() payload: CreateUserDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.createUser(payload);
  }

  @Post('login')
  async login(
    @Body() payload: LoginDTO,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.login(payload);
  }

  @Post('refresh')
  async refreshToken(
    @Body('refreshToken') refreshToken: string,
  ): Promise<{ accessToken: string }> {
    return this.authService.refreshAccessToken(refreshToken);
  }
}
