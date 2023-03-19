import {
  CreateDateColumn,
  Column,
  Entity,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Training } from '../../trainings/entities/training.entity';
import { User } from '../../users/entities/user.entity';
import { KindOfSport } from './KindOfSport';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  kindOfSport: KindOfSport;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => User, (trainer) => trainer.trainerGroups, {
    nullable: false,
  })
  trainer: User;

  @Column({ type: 'text', nullable: false })
  trainerId: string;

  @OneToMany(() => Training, (training) => training.group)
  trainings?: Training[];

  @ManyToMany(() => User, (athlete) => athlete.athleteGroups)
  @JoinTable()
  athletes?: User[];
}
