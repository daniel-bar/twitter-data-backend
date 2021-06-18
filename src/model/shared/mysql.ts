import mysql from 'mysql2/promise';

import { IDBUserData } from './db-table';

type UserDataDB<T extends keyof IDBUserData> = Array<Pick<IDBUserData, T> & mysql.RowDataPacket>;

export { UserDataDB };