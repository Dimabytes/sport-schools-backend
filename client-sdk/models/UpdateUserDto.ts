/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IdTypeDto } from './IdTypeDto';

export type UpdateUserDto = {
    name?: string;
    email?: string;
    password?: string;
    athleteGroups?: Array<IdTypeDto>;
    trainerGroups?: Array<IdTypeDto>;
};

