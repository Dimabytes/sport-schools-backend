import { Training } from './entities/training.entity';
import { UserRole, UserInJwt } from 'src/modules/users/entities/user.entity';
import { TrainingsDao } from 'src/modules/trainings/trainings.dao';

export class TrainingsService {
  public static async isTrainingAllowedForUser(
    training: Training,
    user: UserInJwt,
  ): Promise<boolean> {
    switch (user.role) {
      case UserRole.ADMIN:
        return true;
      case UserRole.TRAINER:
        return training.group.trainerId === user.id;

      case UserRole.ATHLETE:
        const trainingsDao = await TrainingsDao.getDAO();
        return (await trainingsDao.findByAthleteId(user.id)).some(
          ({ id }) => id === training.id,
        );
      default:
        return false;
    }
  }
}
