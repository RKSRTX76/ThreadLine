import express from 'express';

import { 
    addChannelToWorkSpaceController, 
    addMemberToWorkSpaceController, 
    createWorkspaceController, 
    deleteWorkSpaceController, 
    getWorkspaceByJoinCodeController, 
    getWorkspaceController, 
    getWorkspaceUserIsMemberOfController, 
    joinWorkspaceByCodeController,
    resetWorkspaceJoinCodeController, 
    updateWorkspaceController 
} from '../../controllers/workspaceController.js';
import isAuthenticated from '../../middlewares/authMiddlewares.js';
import { addChannelToWorkSpaceSchema, addMemberToWorkSpaceSchema, workspaceSchema } from '../../validators/workspaceSchema.js';
import { validate } from '../../validators/zodValidator.js';


const router = express.Router();

router.post("/", isAuthenticated ,validate(workspaceSchema) , createWorkspaceController);

router.get("/", isAuthenticated , getWorkspaceUserIsMemberOfController);

router.get('/join/:joinCode', isAuthenticated, getWorkspaceByJoinCodeController);

router.post('/join/:joinCode', isAuthenticated, joinWorkspaceByCodeController);

router.put('/:workspaceId/members', isAuthenticated, validate(addMemberToWorkSpaceSchema) , addMemberToWorkSpaceController);

router.put('/:workspaceId/channels', isAuthenticated, validate(addChannelToWorkSpaceSchema) ,addChannelToWorkSpaceController);

router.put('/:workspaceId/joincode/reset', isAuthenticated, resetWorkspaceJoinCodeController );

router.delete('/:workspaceId', isAuthenticated, deleteWorkSpaceController);

router.get('/:workspaceId', isAuthenticated, getWorkspaceController);

router.put('/:workspaceId', isAuthenticated, updateWorkspaceController);


export default router;
