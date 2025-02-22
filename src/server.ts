import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import app from './app';
import connectDB from './config/db';
import { setupSocket } from './sockets/socket';

dotenv.config({ path: "../.env" });


connectDB();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

setupSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { app, server };
