import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto/role-post.dto';
import { AssignUserRoleDto } from './dto/user-role-post.dto';

@Injectable()
export class RoleService {
  constructor(private prismaService: PrismaService) {}

  async createRole(payload: CreateRoleDto): Promise<void> {
    await this.prismaService.role.create({ data: payload });
  }

  async assignUserRole(payload: AssignUserRoleDto): Promise<void> {
    await this.prismaService.userRole.create({ data: payload });
  }
}
