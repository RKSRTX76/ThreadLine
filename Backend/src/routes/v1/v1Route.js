import express from 'express';

import channelRouter from './channel.js';
import memberRouter from './member.js';
import messageRouter from './messages.js';
import userRouter from './users.js';
import workspaceRouter from './workspaceRoute.js';

const v1Router = express.Router();

v1Router.use('/users', userRouter);

v1Router.use('/workspaces', workspaceRouter);

v1Router.use('/channels', channelRouter);

v1Router.use('/members', memberRouter);

v1Router.use('/messages', messageRouter)


export default v1Router;