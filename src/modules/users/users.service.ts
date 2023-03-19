import { UserInJwt, UserRole } from 'src/modules/users/entities/user.entity';
import { BadRequestException, ForbiddenException } from '@nestjs/common';

export class UsersService {
  public static isUserAllowedToInteractWithRole(
    user: UserInJwt,
    role: UserRole,
  ): boolean {
    switch (role) {
      case UserRole.ADMIN:
      case UserRole.TRAINER:
        return user.role === UserRole.ADMIN;
      case UserRole.ATHLETE:
        return user.role === UserRole.ADMIN || user.role === UserRole.TRAINER;
      default:
        throw new BadRequestException();
    }
  }
}
