import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';

@Module({
  controllers: [GroupsController],
  providers: [],
})
export class GroupsModule {}
