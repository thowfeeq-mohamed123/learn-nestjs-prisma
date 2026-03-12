import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersDTO } from './dto/user-dto';
import { JwtAuthGuard } from 'common/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers(): Promise<UsersDTO> {
    return this.userService.getUsers();
  }
}
