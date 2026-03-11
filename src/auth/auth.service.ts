import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDTO } from './dto/login-post.dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(payload: LoginDTO): Promise<{ accessToken: string }> {
    try {
      const { email, password } = payload;

      const user = await this.prismaService.user.findFirst({
        where: { email },
      });

      if (!user) {
        throw new BadRequestException('User not exists', {
          cause: new Error(),
          description: 'Payload email not exists',
        });
      }
      const isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched) {
        throw new BadRequestException('Invalid password', {
          cause: new Error(),
          description: 'User password invalid',
        });
      }

      const jwtPayload = {
        userId: user.id,
        email: user.email,
      };

      const token = this.jwtService.sign(jwtPayload);

      return {
        accessToken: token,
      };
    } catch (error) {
      throw new InternalServerErrorException('Someting went wrong', {
        cause: new Error(),
        description: error?.message ?? null,
      });
    }
  }
}
