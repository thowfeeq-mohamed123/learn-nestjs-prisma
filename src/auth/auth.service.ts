import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDTO } from './dto/login-post.dto';
import { CreateUserDto } from '../user/dto/user-post-dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createUser(payload: CreateUserDto): Promise<{ accessToken: string }> {
    try {
      const user = await this.prismaService.user.findFirst({
        where: { email: payload.email },
      });
      if (user) {
        throw new BadRequestException('User already exists', {
          cause: new Error(),
          description: 'Payload user email already exists',
        });
      }
      const encryptPassword = await this.encryptPassword(payload.password, 10);
      payload.password = encryptPassword;
      const newUser = await this.prismaService.user.create({ data: payload });

      return this.jwtTokenGenerate(newUser);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Something went wrong', {
        cause: new Error(),
        description: error?.message ?? null,
      });
    }
  }

  private async encryptPassword(plainPassword, saltRound): Promise<string> {
    return bcrypt.hash(plainPassword, saltRound);
  }

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
      return this.jwtTokenGenerate(user);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Someting went wrong', {
        cause: new Error(),
        description: error?.message ?? null,
      });
    }
  }

  private async jwtTokenGenerate(user): Promise<{ accessToken: string }> {
    try {
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
