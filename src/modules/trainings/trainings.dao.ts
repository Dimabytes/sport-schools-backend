import { Repository } from 'typeorm';
import { getAppDataSource } from '../../orm/dataSource';
import { Training } from './entities/training.entity';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';

type Repositories = {
  trainingRepository: Repository<Training>;
};

export class TrainingsDao {
  private repositories: Repositories;
  private constructor(repositories: Repositories) {
    this.repositories = repositories;
  }

  public static async getDAO(): Promise<TrainingsDao> {
    const dataSource = await getAppDataSource();
    return new TrainingsDao({
      trainingRepository: dataSource.getRepository(Training),
    });
  }

  public async update(id: string, data: UpdateTrainingDto): Promise<Training> {
    return await this.repositories.trainingRepository.save({ ...data, id });
  }

  public async create(group: CreateTrainingDto): Promise<Training> {
    return this.repositories.trainingRepository.save(group);
  }

  public async findAll(): Promise<Training[]> {
    return this.repositories.trainingRepository.find({
      relations: { group: true },
    });
  }

  public async findByTrainerId(trainerId): Promise<Training[]> {
    return await this.repositories.trainingRepository
      .createQueryBuilder('training')
      .leftJoinAndSelect('training.group', 'group')
      .where('group.trainer = :trainerId', { trainerId })
      .getMany();
  }

  public async findByAthleteId(athleteId): Promise<Training[]> {
    return await this.repositories.trainingRepository
      .createQueryBuilder('training')
      .leftJoinAndSelect('training.group', 'group')
      .leftJoinAndSelect('group.athletes', 'athlete')
      .where('athlete.id = :athleteId', { athleteId: athleteId })
      .getMany();
  }

  public async findById(id: string): Promise<Training> {
    return this.repositories.trainingRepository.findOne({
      where: { id },
      relations: { group: true },
    });
  }

  async remove(id: string): Promise<void> {
    await this.repositories.trainingRepository.delete({ id });
  }
}
