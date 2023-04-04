/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Group } from './Group';

export type Training = {
    id: string;
    startTime: string;
    endTime: string;
    dayOfWeek: Training.dayOfWeek;
    group: Group;
    groupId: string;
    createdAt?: string;
    updatedAt?: string;
};

export namespace Training {

    export enum dayOfWeek {
        MONDAY = 'MONDAY',
        TUESDAY = 'TUESDAY',
        WEDNESDAY = 'WEDNESDAY',
        THURSDAY = 'THURSDAY',
        FRIDAY = 'FRIDAY',
        SATURDAY = 'SATURDAY',
        SUNDAY = 'SUNDAY',
    }


}

