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
  firstName: string;

  @Column({ type: 'text', nullable: false })
  lastName: string;

  @Column({ type: 'text', nullable: false })
  middleName: string;

  @Column({ type: 'text', nullable: true })
  achievements: string;

  @Column({ type: 'text', nullable: true })
  education: string;

  @Column({ type: 'text', nullable: false })
  email: string;

  @Column({ type: 'text', nullable: false, select: false })
  password: string;

  @Column({ type: 'datetime', nullable: false })
  dateOfBirth: Date;

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
