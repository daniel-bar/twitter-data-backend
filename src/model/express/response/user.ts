import express from 'express';

import { IServerResponse } from '../../shared/response';
import { Status } from '../../shared/status';

type IGetUsersResponse = express.Response<
    IServerResponse & Readonly<Partial<{
        data: Readonly<{ usernames: string[] }>;
    }>>
>;

type IGetUserResponse = express.Response<
    IServerResponse & Readonly<Partial<{
        data: Readonly<{
            username: string;
            status: Status;
            description: string;
            profile_picture_link: string;
            following_count: number;
            followers_count: number;
            most_common_word: string;
            retweets_count: number;
        }>;
    }>>
>;

export {
    IGetUsersResponse,
    IGetUserResponse,
};