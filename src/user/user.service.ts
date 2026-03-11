import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/user-post-dto';
import { UserMap } from './user.datamapper';
import { UsersDTO } from './dto/user-dto';

@Injectable()
export class UserService {
  constructor(private prismaSerive: PrismaService) {}

  async createUser(payload: CreateUserDto): Promise<void> {
    try {
      const user = await this.prismaSerive.user.findFirst({
        where: { email: payload.email },
      });
      if (user) {
        throw new BadRequestException('User already exists', {
          cause: new Error(),
          description: 'Payload user email already exists',
        });
      }
      await this.prismaSerive.user.create({ data: payload });
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong', {
        cause: new Error(),
        description: error?.message ?? null,
      });
    }
  }

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
