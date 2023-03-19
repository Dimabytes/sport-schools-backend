import { IsNotEmpty, IsString } from 'class-validator';

export class IdTypeDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
