import express from 'express';

interface IStoreUsersRequest extends express.Request {
    readonly body: Readonly<{
        usernames: ReadonlyArray<string>;
    }>;
}

interface IGetUserRequest extends express.Request {
    readonly params: Readonly<{
        id: string;
    }>;
}

interface IGetUsersRequest extends express.Request { }

interface IGetStatusesRequest extends express.Request { }

export {
    IStoreUsersRequest,
    IGetUserRequest,
    IGetUsersRequest,
    IGetStatusesRequest,
};