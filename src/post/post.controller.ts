import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post-dto';
import { JwtAuthGuard } from '../../common/guard/jwt-auth.guard';
import { GetUser } from '../../common/decorator/user.decorator';
import type { CurrentUser } from '../auth/auth.type';

@UseGuards(JwtAuthGuard)
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post('createPost')
  async createPost(
    @GetUser() user: CurrentUser,
    @Body() payload: CreatePostDto,
  ): Promise<void> {
    return this.postService.createPost(payload, user);
  }
}
