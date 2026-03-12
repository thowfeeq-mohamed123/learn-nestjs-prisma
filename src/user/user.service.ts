import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserMap } from './user.datamapper';
import { UsersDTO } from './dto/user-dto';

@Injectable()
export class UserService {
  constructor(private prismaSerive: PrismaService) {}

  async getUsers(page = 1, limit = 10): Promise<UsersDTO> {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.prismaSerive.user.findMany({
        skip,
        take: limit,
        include: {
          posts: {
            select: {
              title: true,
              description: true,
            },
          },
          userRoles: {
            include: {
              role: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      }),
      this.prismaSerive.user.count(),
    ]);

    return {
      users: users.map((u) => UserMap.toDTO(u)),
      total,
    };
  }
}
