import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post-dto';
import { CurrentUser } from '../auth/auth.type';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}

  async createPost(payload: CreatePostDto, user: CurrentUser): Promise<void> {
    try {
      await this.prismaService.post.create({
        data: {
          ...payload,
          author: {
            connect: { id: user.id },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong', {
        cause: new Error(),
        description: error?.message ?? null,
      });
    }
  }
}
