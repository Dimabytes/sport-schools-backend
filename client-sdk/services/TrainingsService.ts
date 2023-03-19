/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTrainingDto } from '../models/CreateTrainingDto';
import type { Training } from '../models/Training';
import type { UpdateTrainingDto } from '../models/UpdateTrainingDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TrainingsService {

    /**
     * @param requestBody
     * @returns Training
     * @throws ApiError
     */
    public static trainingsControllerCreate(
        requestBody: CreateTrainingDto,
    ): CancelablePromise<Training> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/trainings',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns Training
     * @throws ApiError
     */
    public static trainingsControllerFindAll(): CancelablePromise<Array<Training>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/trainings',
        });
    }

    /**
     * @param id
     * @returns Training
     * @throws ApiError
     */
    public static trainingsControllerFindOne(
        id: string,
    ): CancelablePromise<Training> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/trainings/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id
     * @param requestBody
     * @returns Training
     * @throws ApiError
     */
    public static trainingsControllerUpdate(
        id: string,
        requestBody: UpdateTrainingDto,
    ): CancelablePromise<Training> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/trainings/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static trainingsControllerRemove(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/trainings/{id}',
            path: {
                'id': id,
            },
        });
    }

}
