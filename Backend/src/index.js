import './consumer/mailConsumer.js';

import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import bullServerAdapter from './config/bullBoardConfig.js';
import connectDB from './config/dbConfig.js';
import { PORT } from './config/serverConfig.js';
import ChannelSocketHandler from './controllers/channelSocketController.js';
import MessageSocketHandler from './controllers/messageSocketController.js';
import { verificationEmailController } from './controllers/workspaceController.js';
import apiRouter from './routes/apiRoutes.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors : {
    origin : '*'
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use(cors());



app.use('/ui', bullServerAdapter.getRouter());

app.use('/api', apiRouter);

app.get('/verify/:token', verificationEmailController);

io.on('connection', (socket)=>{
  console.log('A user connected', socket.id);
  MessageSocketHandler(io, socket);
  ChannelSocketHandler(io, socket);
})

// server.listen insted of app.listen because we used websocket using socket.io so we need both should listen
server.listen(PORT, async() => {
  console.log(`Sever is running on PORT ${PORT}`);
  connectDB();
  
});


