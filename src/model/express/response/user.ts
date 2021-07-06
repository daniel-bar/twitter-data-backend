import express from 'express';

import { IServerResponse } from '../../shared/response';
import { Status } from '../../shared/status';

type IStoreUsersResponse = express.Response<
    IServerResponse & Partial<{
        data: { usernames: string[] };
    }>>;

type IGetUserResponse = express.Response<
    IServerResponse & Partial<{
        data?: {
            username: string;
            status: Status;
            description: string;
            profile_picture_link: string;
            following_count: number;
            followers_count: number;
            most_common_word: string;
            retweets_count: number;
        }
    }>>;

type IGetUsersResponse = express.Response<
    IServerResponse & Partial<{
        data?: Array<{
            id: number;
            username: string;
            status: Status;
        }>;
    }>>;

type IGetStatusesResponse = express.Response<
    IServerResponse & Partial<{
        data?: Array<{
            id: number;
            status: Status;
        }>;
    }>>;

export {
    IStoreUsersResponse,
    IGetUserResponse,
    IGetUsersResponse,
    IGetStatusesResponse,
};