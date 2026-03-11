import { Body, Controller, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post-dto';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post('createPost')
  async createPost(@Body() payload: CreatePostDto): Promise<void> {
    return this.postService.createPost(payload);
  }
}
