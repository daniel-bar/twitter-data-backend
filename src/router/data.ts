import express from 'express';

import { bodyKeys } from '../middleware/security';

import {
    getUsers,
    getStatuses,
    getUser,
} from '../controller/backoffice-user';

const router = express.Router();

router.post(
    '/',
    bodyKeys([
        { key: 'username', type: 'string' },
    ]),
    getUsers,
);

router.get(
    '/',
    getStatuses,
);

router.get(
    '/user/:id',
    getUser,
)

export default router;