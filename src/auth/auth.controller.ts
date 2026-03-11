import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from './dto/login-post.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/user-post-dto';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/register')
  async createUser(@Body() payload: CreateUserDto): Promise<void> {
    return this.userService.createUser(payload);
  }

  @Post('login')
  async login(@Body() payload: LoginDTO): Promise<{ accessToken: string }> {
    return this.authService.login(payload);
  }
}
