/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IdTypeDto } from './IdTypeDto';

export type UpdateTrainingDto = {
    startTime?: string;
    endTime?: string;
    group?: IdTypeDto;
    dayOfWeek?: UpdateTrainingDto.dayOfWeek;
};

export namespace UpdateTrainingDto {

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

