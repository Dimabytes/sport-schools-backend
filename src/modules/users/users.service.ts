import { UserInJwt, UserRole } from 'src/modules/users/entities/user.entity';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import * as crypto from 'crypto';

export class UsersService {
  private static passwordWishlist = '0123456789abcdefghijklmnopqrstuvwxyz';
  private static passwordLength = 8;
  public static generatePassword(): string {
    return Array.from(
      crypto.randomFillSync(new Uint32Array(this.passwordLength)),
    )
      .map((x) => this.passwordWishlist[x % this.passwordWishlist.length])
      .join('');
  }

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
