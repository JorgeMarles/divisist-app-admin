

export interface User {
    user: string;
    name: string;
}

export interface UserJWT {
    accessToken: string;
    status: ResponseStatus;
    user: User
}

export enum ResponseStatus {
    OK = 200,
    INVALID_CREDENTIALS = 403,
    UNAUTHORIZED = 401,
    INTERNAL_ERROR = 500,
    NOT_FOUND = 404
}