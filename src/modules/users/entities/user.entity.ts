import {
  CreateDateColumn,
  Column,
  Entity,
  UpdateDateColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { OmitType } from '@nestjs/swagger';
import { Group } from '../../groups/entities/group.entity';

export enum UserRole {
  TRAINER = 'TRAINER',
  ATHLETE = 'ATHLETE',
  ADMIN = 'ADMIN',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  email: string;

  @Column({ type: 'text', nullable: false, select: false })
  password: string;

  @ManyToMany(() => Group, (group) => group.athletes)
  athleteGroups: Group[];

  @OneToMany(() => Group, (group) => group.trainer)
  trainerGroups: Group[];

  @Column({ type: 'text', nullable: false })
  role: UserRole;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}

export class UserWithoutPassword extends OmitType(User, ['password']) {}

export class UserInJwt extends OmitType(UserWithoutPassword, [
  'athleteGroups',
  'trainerGroups',
]) {}
