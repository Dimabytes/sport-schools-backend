import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  IsDateString,
  MaxLength,
} from 'class-validator';
import { UserRole } from 'src/modules/users/entities/user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  middleName: string;

  @IsOptional()
  @IsString()
  achievements?: string;

  @IsOptional()
  @IsString()
  education?: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @MaxLength(10)
  @IsDateString()
  dateOfBirth: Date;
}

export class CreateUserWithRoleDto extends CreateUserDto {
  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;
}
