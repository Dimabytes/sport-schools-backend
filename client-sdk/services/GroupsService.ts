/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateGroupDto } from '../models/CreateGroupDto';
import type { Group } from '../models/Group';
import type { UpdateGroupDto } from '../models/UpdateGroupDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class GroupsService {

    /**
     * @param requestBody
     * @returns Group
     * @throws ApiError
     */
    public static groupsControllerCreate(
        requestBody: CreateGroupDto,
    ): CancelablePromise<Group> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/groups',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns Group
     * @throws ApiError
     */
    public static groupsControllerFindAll(): CancelablePromise<Array<Group>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/groups',
        });
    }

    /**
     * @param id
     * @returns Group
     * @throws ApiError
     */
    public static groupsControllerFindOne(
        id: string,
    ): CancelablePromise<Group> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/groups/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id
     * @param requestBody
     * @returns Group
     * @throws ApiError
     */
    public static groupsControllerUpdate(
        id: string,
        requestBody: UpdateGroupDto,
    ): CancelablePromise<Group> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/groups/{id}',
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
    public static groupsControllerRemove(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/groups/{id}',
            path: {
                'id': id,
            },
        });
    }

}
