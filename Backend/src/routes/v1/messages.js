import express from 'express';

import { getMessagesController, getPaginatedUrlFromCloudinaryController } from '../../controllers/messageController.js';
import isAuthenticated from '../../middlewares/authMiddlewares.js';


const router = express.Router();

router.get('/pre-signed-url', isAuthenticated, getPaginatedUrlFromCloudinaryController);

router.get('/:channelId', isAuthenticated, getMessagesController);

export default router;
