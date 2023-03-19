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
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { Training } from './entities/training.entity';
import { TrainingsDao } from './trainings.dao';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { UserRole, UserInJwt } from 'src/modules/users/entities/user.entity';
import { TrainingsService } from './trainings.service';

@ApiTags('trainings')
@Controller('trainings')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class TrainingsController implements OnModuleInit {
  async onModuleInit(): Promise<void> {
    this.trainingsDao = await TrainingsDao.getDAO();
  }

  private trainingsDao: TrainingsDao;

  @Post()
  async create(
    @Body() body: CreateTrainingDto,
    @Request() req,
  ): Promise<Training> {
    const user: UserInJwt = req.user;
    switch (user.role) {
      case UserRole.ADMIN:
      case UserRole.TRAINER:
        return this.trainingsDao.create(body);
      case UserRole.ATHLETE:
        throw new ForbiddenException();
      default:
        throw new BadRequestException();
    }
  }

  @Get()
  findAll(@Request() req): Promise<Training[]> {
    const user: UserInJwt = req.user;
    switch (user.role) {
      case UserRole.ADMIN:
        return this.trainingsDao.findAll();
      case UserRole.TRAINER:
        return this.trainingsDao.findByTrainerId(req.user.id);
      case UserRole.ATHLETE:
        return this.trainingsDao.findByAthleteId(req.user.id);
      default:
        throw new BadRequestException();
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req): Promise<Training> {
    const user: UserInJwt = req.user;
    const training = await this.trainingsDao.findById(id);
    const isAllowed = TrainingsService.isTrainingAllowedForUser(training, user);
    if (!isAllowed) {
      throw new ForbiddenException();
    }
    return training;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateTrainingDto,
    @Request() req,
  ): Promise<Training> {
    const user: UserInJwt = req.user;
    const training = await this.trainingsDao.findById(id);
    const isAllowed = TrainingsService.isTrainingAllowedForUser(training, user);
    if (!isAllowed) {
      throw new ForbiddenException();
    }
    return this.trainingsDao.update(id, updateGroupDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req): Promise<void> {
    const user: UserInJwt = req.user;
    const training = await this.trainingsDao.findById(id);
    const isAllowed = TrainingsService.isTrainingAllowedForUser(training, user);
    if (!isAllowed) {
      throw new ForbiddenException();
    }
    return this.trainingsDao.remove(id);
  }
}
