import { Module } from '@nestjs/common';
import { TrainingsController } from './trainings.controller';

@Module({
  controllers: [TrainingsController],
  providers: [],
})
export class TrainingsModule {}
