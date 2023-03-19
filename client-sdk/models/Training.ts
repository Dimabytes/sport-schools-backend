/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Group } from './Group';

export type Training = {
    id: string;
    startTime: string;
    endTime: string;
    group: Group;
    groupId: string;
    createdAt?: string;
    updatedAt?: string;
};

