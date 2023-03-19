import { Repository } from 'typeorm';
import { getAppDataSource } from '../../orm/dataSource';
import { Group } from './entities/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

type Repositories = {
  groupRepository: Repository<Group>;
};

export class GroupsDao {
  private repositories: Repositories;
  private constructor(repositories: Repositories) {
    this.repositories = repositories;
  }

  public static async getDAO(): Promise<GroupsDao> {
    const dataSource = await getAppDataSource();
    return new GroupsDao({
      groupRepository: dataSource.getRepository(Group),
    });
  }

  public async update(id: string, data: UpdateGroupDto): Promise<Group> {
    return await this.repositories.groupRepository.save({ ...data, id });
  }

  public async create(group: CreateGroupDto): Promise<Group> {
    return this.repositories.groupRepository.save(group);
  }

  public async findAll(): Promise<Group[]> {
    return this.repositories.groupRepository.find({
      relations: { trainer: true, trainings: true, athletes: true },
    });
  }

  public async findByTrainerId(trainerId): Promise<Group[]> {
    return this.repositories.groupRepository.find({
      where: { trainerId },
      relations: { trainer: true, trainings: true, athletes: true },
    });
  }

  public async findByAthleteId(athleteId): Promise<Group[]> {
    return this.repositories.groupRepository
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.athletes', 'athlete')
      .where('athlete.id = :athleteId', { athleteId })
      .getMany();
  }

  public async findById(id: string): Promise<Group> {
    return this.repositories.groupRepository.findOne({
      where: { id },
      relations: { trainer: true, trainings: true, athletes: true },
    });
  }

  async remove(id: string): Promise<void> {
    await this.repositories.groupRepository.delete({ id });
  }
}
