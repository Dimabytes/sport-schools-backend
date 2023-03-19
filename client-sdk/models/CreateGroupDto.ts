/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IdTypeDto } from './IdTypeDto';

export type CreateGroupDto = {
    kindOfSport: CreateGroupDto.kindOfSport;
    name: string;
    trainer: IdTypeDto;
    athletes: Array<IdTypeDto>;
};

export namespace CreateGroupDto {

    export enum kindOfSport {
        FOOTBALL = 'football',
        BASKET = 'basket',
    }


}

