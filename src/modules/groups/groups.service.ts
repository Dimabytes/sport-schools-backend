import { Group } from './entities/group.entity';
import { UserRole, UserInJwt } from 'src/modules/users/entities/user.entity';

export class GroupsService {
  public static async isGroupAllowedForUser(
    group: Group,
    user: UserInJwt,
  ): Promise<boolean> {
    switch (user.role) {
      case UserRole.ADMIN:
        return true;
      case UserRole.TRAINER:
        return group.trainerId === user.id;

      case UserRole.ATHLETE:
        return group.athletes.some(({ id }) => id === user.id);
      default:
        return false;
    }
  }
}
