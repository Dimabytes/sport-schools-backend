import { Repository } from 'typeorm';
import { getAppDataSource } from '../../orm/dataSource';
import { User } from './entities/user.entity';
import { CreateUserWithRoleDto } from 'src/modules/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import {
  UserWithoutPassword,
  UserRole,
} from 'src/modules/users/entities/user.entity';

type Repositories = {
  userRepository: Repository<User>;
};

export class UsersDao {
  private repositories: Repositories;
  private constructor(repositories: Repositories) {
    this.repositories = repositories;
  }

  public static async getDAO(): Promise<UsersDao> {
    const dataSource = await getAppDataSource();
    return new UsersDao({
      userRepository: dataSource.getRepository(User),
    });
  }

  public async update(
    id: string,
    data: UpdateUserDto,
  ): Promise<UserWithoutPassword> {
    const { password, ...rest } = data;
    await this.repositories.userRepository.save({
      ...rest,
      id,
      password: password
        ? await bcrypt.hash(password, process.env.SALT)
        : undefined,
    });
    return this.findById(id);
  }

  public async create(
    data: CreateUserWithRoleDto,
  ): Promise<UserWithoutPassword> {
    const { password, ...rest } = data;
    const { password: hash, ...createdUser } =
      await this.repositories.userRepository.save({
        ...rest,
        password: await bcrypt.hash(password, process.env.SALT),
      });

    return createdUser;
  }

  public async findAll(): Promise<UserWithoutPassword[]> {
    return this.repositories.userRepository.find({
      relations: { trainerGroups: true, athleteGroups: true },
    });
  }

  public async findByRole(role: UserRole): Promise<UserWithoutPassword[]> {
    return this.repositories.userRepository.find({
      relations: { trainerGroups: true, athleteGroups: true },
      where: { role },
    });
  }

  public async findById(id: string): Promise<UserWithoutPassword> {
    return this.repositories.userRepository.findOne({
      where: { id },
      relations: { trainerGroups: true, athleteGroups: true },
    });
  }

  public async findByIdAndRole(
    id: string,
    role: UserRole,
  ): Promise<UserWithoutPassword> {
    return this.repositories.userRepository.findOne({
      where: { id, role },
      relations: { trainerGroups: true, athleteGroups: true },
    });
  }

  public async findWithPassword(email: string): Promise<User> {
    return this.repositories.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where({ email })
      .leftJoin('user.trainerGroups', 'trainerGroups')
      .leftJoin('user.athleteGroups', 'athleteGroups')
      .getOne();
  }

  async remove(id: string): Promise<void> {
    await this.repositories.userRepository.delete({ id });
  }
}
