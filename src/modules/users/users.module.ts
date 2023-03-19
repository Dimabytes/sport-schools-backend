import { Module } from '@nestjs/common';
import { UsersController } from 'src/modules/users/users.controller';

@Module({
  controllers: [UsersController],
})
export class UsersModule {}
