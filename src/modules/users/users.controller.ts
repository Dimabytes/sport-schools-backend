import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
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
import { MailService } from 'src/services/MailService/mail.service';

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
  async create(
    @Body() data: CreateUserDto,
    @Query('role') role: UserRole,
    @Request() req,
  ): Promise<UserWithoutPassword> {
    const user: UserInJwt = req.user;
    if (user.role !== UserRole.ADMIN) {
      throw new ForbiddenException();
    }

    const password = UsersService.generatePassword();
    const mailService = await MailService.getService();
    await mailService.sendMail({
      from: '"Спортивная школа" <noreply@sport-school.ru>', // sender address
      to: data.email, // list of receivers
      subject: 'Ваш пароль', // Subject line
      text: `Ваш пароль для входа в систему: ${password}`, // plain text body
    });

    return this.usersDao.create({ ...data, role }, password);
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
  async findOne(
    @Param('id') id: string,
    @Request() req,
  ): Promise<UserWithoutPassword> {
    const user: UserInJwt = req.user;
    const result = await this.usersDao.findById(id);
    if (!UsersService.isUserAllowedToInteractWithRole(user, result.role)) {
      throw new ForbiddenException();
    }
    return result;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
    @Request() req,
  ): Promise<UserWithoutPassword> {
    const user: UserInJwt = req.user;
    if (user.role !== UserRole.ADMIN) {
      throw new ForbiddenException();
    }
    return this.usersDao.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Request() req): Promise<void> {
    const user: UserInJwt = req.user;
    if (user.role !== UserRole.ADMIN) {
      throw new ForbiddenException();
    }
    await this.usersDao.remove(id);
  }
}
