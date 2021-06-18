import path from 'path';

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
    }

    // const sql = 'CREATE TABLE `user`.`config` (
    //             `id` int unsigned NOT NULL AUTO_INCREMENT,
    //             `username` varchar(15) NOT NULL,
    //             `status` BOOLEAN DEFAULT 1,
    //             `description` varchar(280) NOT NULL,
    //             `profile_picture_link` varchar(2048) NOT NULL,
    //             `following_count` int unsigned NOT NULL,
    //             `followers_count` int unsigned NOT NULL,
    //             `most_common_word` varchar(29) NOT NULL,
    //             `retweets_count` int unsigned NOT NULL,
    //             `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    //             `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    //             PRIMARY KEY (`id`),
    //             UNIQUE KEY `username_UNQIUE` (`username`)
    //             ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;';

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