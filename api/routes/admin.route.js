import express from 'express';
import {viewUsers} from '../controllers/admin.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { verifyRole } from '../utils/verifyRole.js';

const router = express.Router();

router.get('/view-users',verifyToken,verifyRole,viewUsers)



export default router;