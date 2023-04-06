/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IdTypeDto } from './IdTypeDto';

export type CreateTrainingDto = {
    startTime: string;
    endTime: string;
    group: IdTypeDto;
    dayOfWeek: CreateTrainingDto.dayOfWeek;
};

export namespace CreateTrainingDto {

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

