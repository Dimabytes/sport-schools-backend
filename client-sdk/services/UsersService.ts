/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserDto } from '../models/CreateUserDto';
import type { UpdateUserDto } from '../models/UpdateUserDto';
import type { UserWithoutPassword } from '../models/UserWithoutPassword';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UsersService {

    /**
     * @param role
     * @param requestBody
     * @returns UserWithoutPassword
     * @throws ApiError
     */
    public static usersControllerCreate(
        role: string,
        requestBody: CreateUserDto,
    ): CancelablePromise<UserWithoutPassword> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users',
            query: {
                'role': role,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param role
     * @returns UserWithoutPassword
     * @throws ApiError
     */
    public static usersControllerFindAll(
        role: string,
    ): CancelablePromise<Array<UserWithoutPassword>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users',
            query: {
                'role': role,
            },
        });
    }

    /**
     * @param id
     * @param role
     * @returns UserWithoutPassword
     * @throws ApiError
     */
    public static usersControllerFindOne(
        id: string,
        role: string,
    ): CancelablePromise<UserWithoutPassword> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{id}',
            path: {
                'id': id,
            },
            query: {
                'role': role,
            },
        });
    }

    /**
     * @param id
     * @param role
     * @param requestBody
     * @returns UserWithoutPassword
     * @throws ApiError
     */
    public static usersControllerUpdate(
        id: string,
        role: string,
        requestBody: UpdateUserDto,
    ): CancelablePromise<UserWithoutPassword> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/users/{id}',
            path: {
                'id': id,
            },
            query: {
                'role': role,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id
     * @param role
     * @returns any
     * @throws ApiError
     */
    public static usersControllerRemove(
        id: string,
        role: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/users/{id}',
            path: {
                'id': id,
            },
            query: {
                'role': role,
            },
        });
    }

}
