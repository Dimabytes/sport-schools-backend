/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JWTDto } from '../models/JWTDto';
import type { LoginDto } from '../models/LoginDto';
import type { UserWithoutPassword } from '../models/UserWithoutPassword';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * @param requestBody
     * @returns JWTDto
     * @throws ApiError
     */
    public static authControllerLogin(
        requestBody: LoginDto,
    ): CancelablePromise<JWTDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns UserWithoutPassword
     * @throws ApiError
     */
    public static authControllerGetProfile(): CancelablePromise<UserWithoutPassword> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/profile',
        });
    }

}
