import path from 'path';
import fs from 'fs/promises';

import mysql from 'mysql2/promise';
import winston from 'winston';

class ServerGlobal {
    private readonly _db: mysql.Pool;
    private readonly _logger: winston.Logger;

    private static _instance: ServerGlobal;

    private constructor() {
        this._db = mysql.createPool({
            host: process.env.MYSQL_HOST,
            port: parseInt(process.env.MYSQL_PORT),
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PWD,
            database: process.env.MYSQL_DB,
        });

        this._logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
            ),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({
                    filename: path.join(__dirname, '../logs.log'),
                    level: 'info',
                }),
            ],
        });

        const sqlResourceFile = path.join(__dirname, '../resource/twitter_api.sql');
        fs.readFile(sqlResourceFile, 'utf-8').then((fileData) => {
            this._db.execute(fileData).catch(() => { });
        });
    }

    /**
    * Getter for singelton instance
    * @returns ServerGlobal singelton instance
    */
    static getInstance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new ServerGlobal();
        return this._instance;
    }

    /**
    * Getter for the db pool
    * @returns db pool instance
    */
    public get dbPool() {
        return this._db;
    }

    /**
    * Getter for the logger
    * @returns logger instance 
    */
    public get logger() {
        return this._logger;
    }
}

export default ServerGlobal;