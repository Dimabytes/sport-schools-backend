import { IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { DayOfWeek } from '../entities/training.entity';
import { IdTypeDto } from 'src/types/IdType.dto';

export class CreateTrainingDto {
  @IsNotEmpty()
  @IsString()
  startTime: string;

  @IsNotEmpty()
  @IsString()
  endTime: string;

  @IsNotEmpty()
  @ValidateNested()
  group: IdTypeDto;

  @IsNotEmpty()
  @IsEnum(DayOfWeek)
  dayOfWeek: DayOfWeek;
}
