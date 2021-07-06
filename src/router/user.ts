import express from 'express';

import { bodyKeys } from '../middleware/security';

import {
    storeUsers,
    getUser,
    getUsers,
    getStatuses,
} from '../controller/user';

const router = express.Router();

router.post(
    '/',
    bodyKeys([
        { key: 'usernames', type: 'object' },
    ]),
    storeUsers,
);

router.get(
    '/:id',
    getUser,
);

router.get(
    '/',
    getUsers,
);

router.get(
    '/status',
    getStatuses,
);

export default router;