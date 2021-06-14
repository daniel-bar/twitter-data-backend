import express from 'express';

import { IServerResponse } from '../../shared/response';

type IGetUsersResponse = express.Response<
    IServerResponse & Readonly<Partial<{
        data: Readonly<{ usernames: string[] }>;
    }>>
>;

type IGetStatusesResponse = express.Response<
    IServerResponse & Readonly<Partial<{
        data: ReadonlyArray<{ statuses: string[] }>;
    }>>
>;

type IGetUserResponse = express.Response<
    IServerResponse & Readonly<Partial<{
        data: ReadonlyArray<{ id: string }>;
    }>>
>;

export {
    IGetUsersResponse,
    IGetStatusesResponse,
    IGetUserResponse,
};