import { Injectable, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersDao } from 'src/modules/users/users.dao';
import { UserWithoutPassword } from 'src/modules/users/entities/user.entity';
import { JWTDto } from 'src/modules/auth/dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService implements OnModuleInit {
  async onModuleInit(): Promise<void> {
    this.usersDao = await UsersDao.getDAO();
  }

  private usersDao: UsersDao;

  constructor(private jwtService: JwtService) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<UserWithoutPassword> {
    const user = await this.usersDao.findWithPassword(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserWithoutPassword): Promise<JWTDto> {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
