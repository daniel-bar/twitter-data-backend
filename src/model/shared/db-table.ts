import { Status } from './status';

interface IDBTable {
    readonly id: number;
    readonly created_at: Date;
    readonly updated_at: Date;
}

interface IDBUserData extends IDBTable {
    readonly username: string;
    readonly status: Status;
    readonly description: string;
    readonly profile_picture_link: string;
    readonly following_count: number;
    readonly followers_count: number;
    readonly most_common_word: string;
    readonly retweets_count: number;
}

export {
    IDBTable,
    IDBUserData,
};