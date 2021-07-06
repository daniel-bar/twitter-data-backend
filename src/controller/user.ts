import mysql from 'mysql2';

import ServerGlobal from '../server-global';

import { UserDataDB } from '../model/shared/mysql';
import { Status } from '../model/shared/status';

import {
    IStoreUsersRequest,
    IGetUserRequest,
    IGetUsersRequest,
    IGetStatusesRequest,
} from '../model/express/request/user';
import {
    IStoreUsersResponse,
    IGetUserResponse,
    IGetUsersResponse,
    IGetStatusesResponse,
} from '../model/express/response/user';

const storeUsers = async (req: IStoreUsersRequest, res: IStoreUsersResponse) => {
    ServerGlobal.getInstance().logger.info(`<storeUsers>: Start processing request`);

    let sql: string;

    try {
        const usernamesArray = req.body.usernames;
        const sqlInsertionQuery = usernamesArray.map(username => `('${username}', ${Status.Intiated})`);

        sql = `INSERT INTO user (username, status) VALUES ${sqlInsertionQuery}`;

        // Insert user to database
        const [insertionAction] = await ServerGlobal.getInstance().dbPool.execute<mysql.ResultSetHeader>(sql, [
            req.body.usernames,
        ]);

        ServerGlobal.getInstance().logger.info(`<storeUsers>: Successfully inserted users to DB`);

        res.status(200).send({
            success: true,
            message: 'Successfully inserted users to DB',
        });

        // Twitter API has started collecting user data

        // Update the user status to Pending(1)
        for (let i = 0; i < usernamesArray.length; i++) {
            sql = `UPDATE user SET status=${Status.Intiated} WHERE username='${usernamesArray[i]}'`;
            const [{ affectedRows }] = await ServerGlobal.getInstance().dbPool.execute<mysql.ResultSetHeader>(sql, [
                req.body.usernames,
            ]);
        }

        ServerGlobal.getInstance().logger.info(`<storeUsers>: Successfully updated users statuses to Pending`);

        // SOME DATA UNTIL TWITTER API
        const someData = {
            description: 'i am a cat meow',
            profile_picture_link: 'https://media-exp1.licdn.com/dms/image/C4D03AQFR7P9-Rp4W-Q/profile-displayphoto-shrink_400_400/0/1618248952924?e=1629936000&v=beta&t=w-UP63zQ1eBQN9tNnPBJkZNSkiIjEtYAdn5aQlw8res',
            following_count: 69,
            followers_count: 69,
            most_common_word: 'cats',
            retweets_count: 302,
        }

        // Twitter API finished to collect user data

        for (let i = 0; i < usernamesArray.length; i++) {
            sql = `UPDATE user SET description='${someData.description}', profile_picture_link='${someData.profile_picture_link}', following_count=${someData.following_count}, followers_count=${someData.followers_count}, most_common_word='${someData.most_common_word}', retweets_count=${someData.retweets_count} WHERE username='${usernamesArray[i]}'`;
            const [userRow] = await ServerGlobal.getInstance().dbPool.execute<
                UserDataDB<'description' | 'profile_picture_link' | 'following_count' | 'followers_count' | 'most_common_word' | 'retweets_count'>
            >(sql);
        }


        // Update the user status to Failed(3)
        /**
        * for (let i = 0; i < usernamesArray.length; i++) {
        *     sql = `UPDATE user SET status=${Status.Failed} WHERE username='${usernamesArray[i]}'`;
        *     const [{ affectedRows }] = await ServerGlobal.getInstance().dbPool.execute<mysql.ResultSetHeader>(sql, [
        *         req.body.usernames,
        *     ]);
        * }
        * 
        * ServerGlobal.getInstance().logger.info(`<storeUsers>: Successfully updated users statuses to Failed`);
        */

        setInterval(async () => {
            // Update the user status to Success(2)
            for (let i = 0; i < usernamesArray.length; i++) {
                sql = `UPDATE user SET status=${Status.Success} WHERE username='${usernamesArray[i]}'`;
                const [{ affectedRows }] = await ServerGlobal.getInstance().dbPool.execute<mysql.ResultSetHeader>(sql, [
                    req.body.usernames,
                ]);
            }
        }, 5000)

        ServerGlobal.getInstance().logger.info(`<storeUsers>: Successfully updated users statuses to Success`);
    } catch (e) {
        ServerGlobal.getInstance().logger.error(
            `<storeUsers>: Failed to process request with error: ${e}`
        );

        res.status(500).send({
            success: false,
            message: 'Server error',
        });
        return;
    }
}

const getUser = async (req: IGetUserRequest, res: IGetUserResponse) => {
    ServerGlobal.getInstance().logger.info(`<getUser>: Start processing request`);

    const sql = 'SELECT username, status, description, profile_picture_link, following_count, followers_count, most_common_word, retweets_count FROM user WHERE id=?';

    try {
        // Get user data
        const [[userRow]] = await ServerGlobal.getInstance().dbPool.execute<
            UserDataDB<'username' | 'status' | 'description' | 'profile_picture_link' | 'following_count' | 'followers_count' | 'most_common_word' | 'retweets_count'>
        >(sql, [+req.params.id]);

        // If there is not such user id in DB
        if (!userRow) {
            ServerGlobal.getInstance().logger.error(`<getUser>: Could not find user with DB id of ${req.params.id}`);

            res.status(400).send({
                success: false,
                message: 'Could not find user',
            });
            return;
        }

        ServerGlobal.getInstance().logger.info(`<getUser>: Successfully processed request with DB id ${req.params.id}`);

        res.status(200).send({
            success: true,
            message: 'Successfully sent user data',
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
            `<getUser>: Failed to process request with error: ${e} with DB id ${req.params.id}`
        );

        res.status(500).send({
            success: false,
            message: 'Server error',
        });
        return;
    }
}

const getUsers = async (req: IGetUsersRequest, res: IGetUsersResponse) => {
    ServerGlobal.getInstance().logger.info(`<getUsers>: Start processing request`);

    const sql = 'SELECT id, username, status FROM user';

    try {
        // Get users data
        const [usersRows] = await ServerGlobal.getInstance().dbPool.execute<
            UserDataDB<'id' | 'username' | 'status'>
        >(sql);

        // Prepare users data to send
        const users = usersRows.map((userDB) => ({
            id: userDB.id,
            username: userDB.username,
            status: userDB.status,
        }));

        // If there is no rows in DB
        if (!usersRows) {
            ServerGlobal.getInstance().logger.error(`<getUsers>: Could not find users rows`);

            res.status(400).send({
                success: false,
                message: 'Could not find users rows',
            });
            return;
        }

        ServerGlobal.getInstance().logger.info(`<getUsers>: Successfully processed request with DB`);

        res.status(200).send({
            success: true,
            message: 'Successfully sent users data',
            data: users,
        });

    } catch (e) {
        ServerGlobal.getInstance().logger.error(
            `<getUsers>: Failed to process request with error: ${e} with DB id ${req.params.id}`
        );

        res.status(500).send({
            success: false,
            message: 'Server error',
        });
        return;
    }
}

const getStatuses = async (req: IGetStatusesRequest, res: IGetStatusesResponse) => {
    ServerGlobal.getInstance().logger.info(`<getStatuses>: Start processing request`);

    const sql = 'SELECT id, status FROM user';

    try {
        // Get statuses
        const [usersRows] = await ServerGlobal.getInstance().dbPool.execute<
            UserDataDB<'id' | 'status'>
        >(sql);

        // Prepare statuses to send
        const users = usersRows.map((userDB) => ({
            id: userDB.id,
            status: userDB.status,
        }));

        // If there is no rows in DB
        if (!usersRows) {
            ServerGlobal.getInstance().logger.error(`<getStatuses>: Could not find users rows`);

            res.status(400).send({
                success: false,
                message: 'Could not find users rows',
            });
            return;
        }

        ServerGlobal.getInstance().logger.info(`<getStatuses>: Successfully processed request with DB`);

        res.status(200).send({
            success: true,
            message: 'Successfully sent statuses',
            data: users,
        });

    } catch (e) {
        ServerGlobal.getInstance().logger.error(
            `<getStatuses>: Failed to process request with error: ${e} with DB id ${req.params.id}`
        );

        res.status(500).send({
            success: false,
            message: 'Server error',
        });
        return;
    }
}


export {
    storeUsers,
    getUser,
    getUsers,
    getStatuses,
};