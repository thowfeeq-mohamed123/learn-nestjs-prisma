import { Body, Controller, Post, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user-post-dto';
import { UsersDTO } from './dto/user-dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  async createUser(@Body() payload: CreateUserDto): Promise<void> {
    return this.userService.createUser(payload);
  }

  @Get()
  async getUsers(): Promise<UsersDTO> {
    return this.userService.getUsers();
  }
}
