import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  OnModuleInit,
  UseGuards,
  Request,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';
import { GroupsDao } from './groups.dao';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { UserRole, UserInJwt } from 'src/modules/users/entities/user.entity';
import { GroupsService } from 'src/modules/groups/groups.service';

@ApiTags('groups')
@Controller('groups')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class GroupsController implements OnModuleInit {
  async onModuleInit(): Promise<void> {
    this.groupsDao = await GroupsDao.getDAO();
  }

  private groupsDao: GroupsDao;

  @Post()
  create(
    @Body() createGroupDto: CreateGroupDto,
    @Request() req,
  ): Promise<Group> {
    const user: UserInJwt = req.user;
    switch (user.role) {
      case UserRole.ADMIN:
      case UserRole.TRAINER:
        return this.groupsDao.create(createGroupDto);
      case UserRole.ATHLETE:
        throw new ForbiddenException();
      default:
        throw new BadRequestException();
    }
  }

  @Get()
  findAll(@Request() req): Promise<Group[]> {
    const user: UserInJwt = req.user;
    switch (user.role) {
      case UserRole.ADMIN:
        return this.groupsDao.findAll();
      case UserRole.TRAINER:
        return this.groupsDao.findByTrainerId(req.user.id);
      case UserRole.ATHLETE:
        return this.groupsDao.findByAthleteId(req.user.id);
      default:
        throw new BadRequestException();
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req): Promise<Group> {
    const user: UserInJwt = req.user;
    const group = await this.groupsDao.findById(id);
    const isAllowed = GroupsService.isGroupAllowedForUser(group, user);
    if (!isAllowed) {
      throw new ForbiddenException();
    }
    return group;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
    @Request() req,
  ): Promise<Group> {
    const user: UserInJwt = req.user;
    if (user.role === UserRole.ATHLETE) {
      throw new ForbiddenException();
    }
    const group = await this.groupsDao.findById(id);
    const isAllowed = GroupsService.isGroupAllowedForUser(group, user);
    if (!isAllowed) {
      throw new ForbiddenException();
    }
    return this.groupsDao.update(id, updateGroupDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req): Promise<void> {
    const user: UserInJwt = req.user;
    if (user.role === UserRole.ATHLETE) {
      throw new ForbiddenException();
    }
    const group = await this.groupsDao.findById(id);
    const isAllowed = GroupsService.isGroupAllowedForUser(group, user);
    if (!isAllowed) {
      throw new ForbiddenException();
    }
    return this.groupsDao.remove(id);
  }
}
