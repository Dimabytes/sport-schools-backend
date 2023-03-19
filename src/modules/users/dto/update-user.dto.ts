import { PartialType } from '@nestjs/swagger';
import { CreateUserDto, CreateUserWithRoleDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
export class UpdateUserWithRoleDto extends PartialType(CreateUserWithRoleDto) {}
