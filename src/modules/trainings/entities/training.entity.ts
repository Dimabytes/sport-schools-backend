import {
  CreateDateColumn,
  Column,
  Entity,
  UpdateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Group } from '../../groups/entities/group.entity';

export enum DayOfWeek {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

@Entity()
export class Training {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  startTime: string;

  @Column({ type: 'text', nullable: false })
  endTime: string;

  @Column({ type: 'text', nullable: false })
  dayOfWeek: DayOfWeek;

  @ManyToOne(() => Group, (group) => group.trainings, {
    nullable: false,
  })
  group: Group;

  @Column({ type: 'text', nullable: false })
  groupId: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
