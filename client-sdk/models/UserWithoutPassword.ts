/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Group } from './Group';

export type UserWithoutPassword = {
    id: string;
    firstName: string;
    lastName: string;
    middleName: string;
    achievements: string;
    education: string;
    email: string;
    dateOfBirth: string;
    athleteGroups: Array<Group>;
    trainerGroups: Array<Group>;
    role: UserWithoutPassword.role;
    createdAt?: string;
    updatedAt?: string;
};

export namespace UserWithoutPassword {

    export enum role {
        TRAINER = 'TRAINER',
        ATHLETE = 'ATHLETE',
        ADMIN = 'ADMIN',
    }


}

