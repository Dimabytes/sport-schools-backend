import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  OnModuleInit,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';
import { UsersDao } from 'src/modules/users/users.dao';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  UserWithoutPassword,
  UserRole,
  UserInJwt,
} from 'src/modules/users/entities/user.entity';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { UsersService } from 'src/modules/users/users.service';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UsersController implements OnModuleInit {
  private usersDao: UsersDao;

  async onModuleInit(): Promise<void> {
    this.usersDao = await UsersDao.getDAO();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() data: CreateUserDto,
    @Query('role') role: UserRole,
    @Request() req,
  ): Promise<UserWithoutPassword> {
    const user: UserInJwt = req.user;
    if (!UsersService.isUserAllowedToInteractWithRole(user, role)) {
      throw new ForbiddenException();
    }
    return this.usersDao.create({ ...data, role });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(
    @Request() req,
    @Query('role') role: UserRole,
  ): Promise<UserWithoutPassword[]> {
    const user: UserInJwt = req.user;
    if (!UsersService.isUserAllowedToInteractWithRole(user, role)) {
      throw new ForbiddenException();
    }
    return this.usersDao.findByRole(role);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(
    @Param('id') id: string,
    @Query('role') role: UserRole,
    @Request() req,
  ): Promise<UserWithoutPassword> {
    const user: UserInJwt = req.user;
    if (!UsersService.isUserAllowedToInteractWithRole(user, role)) {
      throw new ForbiddenException();
    }
    return this.usersDao.findByIdAndRole(id, role);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
    @Request() req,
    @Query('role') role: UserRole,
  ): Promise<UserWithoutPassword> {
    const user: UserInJwt = req.user;
    if (!UsersService.isUserAllowedToInteractWithRole(user, role)) {
      throw new ForbiddenException();
    }
    if (!(await this.usersDao.findByIdAndRole(id, role))) {
      throw new NotFoundException();
    }
    return this.usersDao.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(
    @Param('id') id: string,
    @Request() req,
    @Query('role') role: UserRole,
  ): Promise<void> {
    const user: UserInJwt = req.user;
    if (!UsersService.isUserAllowedToInteractWithRole(user, role)) {
      throw new ForbiddenException();
    }
    if (!(await this.usersDao.findByIdAndRole(id, role))) {
      return;
    }
    await this.usersDao.remove(id);
  }
}
