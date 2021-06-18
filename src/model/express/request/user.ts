import express from 'express';

interface IGetUsersRequest extends express.Request {
    readonly body: Readonly<{
        usernames: ReadonlyArray<string>;
    }>;
}

interface IGetUserRequest extends express.Request {
    readonly body: Readonly<{
        id: string;
    }>;
}

export {
    IGetUsersRequest,
    IGetUserRequest,
};