import express from 'express';

import { bodyKeys } from '../middleware/security';

import {
    getUsers,
    // getUser,
} from '../controller/user';

const router = express.Router();

router.post(
    '/',
    bodyKeys([
        { key: 'username', type: 'string' },
    ]),
    getUsers,
);

// router.get(
//     '/user/:id',
//     getUser,
// );

export default router;