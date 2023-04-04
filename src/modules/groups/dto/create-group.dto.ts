import {
  IsNotEmpty,
  IsEnum,
  IsArray,
  ValidateNested,
  IsOptional,
  IsString,
} from 'class-validator';
import { KindOfSport } from '../entities/group.entity';
import { IdTypeDto } from 'src/types/IdType.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(KindOfSport)
  @ApiProperty({
    enum: KindOfSport,
  })
  kindOfSport: KindOfSport;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  trainer: IdTypeDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  athletes: IdTypeDto[];
}
