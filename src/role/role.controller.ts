import { Body, Controller, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/role-post.dto';
import { AssignUserRoleDto } from './dto/user-role-post.dto';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post('createRole')
  async createRole(@Body() payload: CreateRoleDto): Promise<void> {
    return this.roleService.createRole(payload);
  }

  @Post('assignRole')
  async assignUserRole(@Body() payload: AssignUserRoleDto): Promise<void> {
    return this.roleService.assignUserRole(payload);
  }
}
