import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { UserRole } from 'src/modules/users/entities/user.entity';
import { IdTypeDto } from 'src/types/IdType.dto';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  athleteGroups: IdTypeDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  trainerGroups: IdTypeDto[];
}

export class CreateUserWithRoleDto extends CreateUserDto {
  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;
}
