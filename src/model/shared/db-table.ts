import { Status } from './status';

interface IDBTable {
    readonly id: number;
    readonly created_at: Date;
    readonly updated_at: Date;
}

interface IDBUsers extends IDBTable {
    readonly username: string;
}

interface IDBStatuses extends IDBTable {
    readonly id_number: string;
    readonly status: Status;
}

interface IDBUserData extends IDBTable {
    readonly user_id: string;
    readonly profile_pic: string;
    readonly description: string;
    readonly followers_num: string;
    readonly following_num: string;
    readonly most_used_word: string;
    readonly retwwets_sum: string;
}

export {
    IDBTable,
    IDBUsers,
    IDBStatuses,
    IDBUserData,
};