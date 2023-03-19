/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IdTypeDto } from './IdTypeDto';

export type UpdateGroupDto = {
    kindOfSport?: UpdateGroupDto.kindOfSport;
    name?: string;
    trainer?: IdTypeDto;
    athletes?: Array<IdTypeDto>;
};

export namespace UpdateGroupDto {

    export enum kindOfSport {
        FOOTBALL = 'football',
        BASKET = 'basket',
    }


}

