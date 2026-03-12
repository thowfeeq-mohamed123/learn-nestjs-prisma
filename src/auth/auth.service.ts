import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { StringValue } from 'ms';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDTO } from './dto/login-post.dto';
import { CreateUserDto } from '../user/dto/user-post-dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createUser(
    payload: CreateUserDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
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

      return this.generateTokens(newUser);
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

  async login(
    payload: LoginDTO,
  ): Promise<{ accessToken: string; refreshToken: string }> {
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
      return this.generateTokens(user);
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

  async generateTokens(
    user,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = {
      sub: user?.id ?? null,
      email: user?.email ?? null,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN as StringValue,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN as StringValue,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshAccessToken(
    refreshToken: string,
  ): Promise<{ accessToken: string }> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const accessToken = await this.jwtService.signAsync(
        {
          sub: payload.sub,
          email: payload.email,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: process.env.JWT_EXPIRES_IN as StringValue,
        },
      );

      return {
        accessToken,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid refresh token', {
        cause: new Error(),
        description: error?.message ?? null,
      });
    }
  }
}
