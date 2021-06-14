import express from 'express';

interface IGetUsersRequest extends express.Request {
    readonly body: ReadonlyArray<{
        usernames: string[];
    }>;
}

interface IGetStatusesRequest extends express.Request {
    readonly body: ReadonlyArray<{
        statuses: string[];
    }>;
}

interface IGetUserRequest extends express.Request {
    readonly body: Readonly<{
        id: string;
    }>;
}

export {
    IGetUsersRequest,
    IGetStatusesRequest,
    IGetUserRequest,
};