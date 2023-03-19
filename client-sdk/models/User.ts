/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Group } from './Group';

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    athleteGroups: Array<Group>;
    trainerGroups: Array<Group>;
    role: User.role;
    createdAt?: string;
    updatedAt?: string;
};

export namespace User {

    export enum role {
        TRAINER = 'TRAINER',
        ATHLETE = 'ATHLETE',
        ADMIN = 'ADMIN',
    }


}

