import mysql from 'mysql2';

import ServerGlobal from '../server-global';

import { UserDataDB } from '../model/shared/mysql';

import {
    IGetUsersRequest,
    IGetUserRequest,
} from '../model/express/request/user';
import {
    IGetUsersResponse,
    IGetUserResponse,
} from '../model/express/response/user';

const getUsers = async (req: IGetUsersRequest, res: IGetUsersResponse) => {
    ServerGlobal.getInstance().logger.info(`<getUsers>: Start processing request`);

    try {
        // const sqlInsertionQuery = req.body.usernames.map(());

        const sql = `INSERT INTO user (username, status) VALUES (?, ?)`;
        // Insert user to database
        const [insertionAction] = await ServerGlobal.getInstance().dbPool.execute<mysql.ResultSetHeader>(sql, [
            req.body.usernames,
        ]);

        // Get all patient failure reports
        const [usersRows] = await ServerGlobal.getInstance().dbPool.execute<
            UserDataDB<'id' | 'username' | 'status' | 'description' | 'profile_picture_link' | 'following_count' | 'followers_count' | 'most_common_word' | 'retweets_count'>
        >(sql);

        // const sqlUpdate = 'UPDATE twitterapi SET status=0 WHERE id=?';

        res.status(200).send({
            success: true,
            message: 'Successfully retrieved users',
            // data: {

            // },
        });
    } catch (e) {
        ServerGlobal.getInstance().logger.error(
            `<getUsers>: Failed to process request with error: ${e}`
        );

        res.status(500).send({
            success: false,
            message: 'Server error',
        });
        return;
    }
}

const getUser = async (req: IGetUserRequest, res: IGetUserResponse) => {
    ServerGlobal.getInstance().logger.info(`<getUsers>: Start processing request`);

    const sql = 'SELECT id, username, status, description, profile_picture_link, following_count, followers_count, most_common_word, retweets_count FROM user WHERE id=?';

    try {
        // Get user data
        const [[userRow]] = await ServerGlobal.getInstance().dbPool.execute<
            UserDataDB<'id' | 'username' | 'status' | 'description' | 'profile_picture_link' | 'following_count' | 'followers_count' | 'most_common_word' | 'retweets_count'>
        >(sql, [req.body.id]);

        // If there is not such user id in DB
        if (!userRow) {
            ServerGlobal.getInstance().logger.error(`<getUser>: Could not find user with DB id of ${req.body.id}`);

            res.status(400).send({
                success: false,
                message: 'Could not find user',
            });
            return;
        }

        ServerGlobal.getInstance().logger.info(`<getUser>: Successfully processed request with DB id ${req.body.id}`);

        res.status(200).send({
            success: true,
            message: 'Successfully retrieved user data',
            data: {
                username: userRow.username,
                status: userRow.status,
                description: userRow.description,
                profile_picture_link: userRow.profile_picture_link,
                following_count: userRow.following_count,
                followers_count: userRow.followers_count,
                most_common_word: userRow.most_common_word,
                retweets_count: userRow.retweets_count,
            },
        });
        return;
    } catch (e) {
        ServerGlobal.getInstance().logger.error(
            `<getUser>: Failed to process request with error: ${e} with DB id ${req.body.id}`
        );

        res.status(500).send({
            success: false,
            message: 'Server error',
        });
        return;
    }
}

export {
    getUsers,
    getUser,
};