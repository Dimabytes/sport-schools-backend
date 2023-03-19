/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Training } from './Training';
import type { User } from './User';

export type Group = {
    id: string;
    name: string;
    kindOfSport: Group.kindOfSport;
    createdAt?: string;
    updatedAt?: string;
    trainer: User;
    trainerId: string;
    trainings?: Array<Training>;
    athletes?: Array<User>;
};

export namespace Group {

    export enum kindOfSport {
        FOOTBALL = 'football',
        BASKET = 'basket',
    }


}

