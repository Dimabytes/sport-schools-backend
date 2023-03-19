import { Module } from '@nestjs/common';
import { GroupsModule } from './modules/groups/groups.module';
import { TrainingsModule } from './modules/trainings/trainings.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  controllers: [],
  imports: [AuthModule, GroupsModule, TrainingsModule, UsersModule],
})
export class AppModule {}
