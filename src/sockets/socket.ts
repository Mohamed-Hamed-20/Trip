import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import redis from '../config/redis';

export const setupSocket = (io: Server) => {
  io.use((socket: Socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Authentication error'));
    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
      if (err) return next(new Error('Authentication error'));
      (socket as any).user = decoded;
      next();
    });
  });

  io.on('connection', (socket: Socket) => {
    const user = (socket as any).user;
    console.log(`User connected: ${user.id}`);

    socket.on('joinRoom', (room: string) => {
      socket.join(room);
      console.log(`User ${user.id} joined room: ${room}`);
    });

    socket.on('sendMessage', ({ room, message }) => {
      io.to(room).emit('message', { user: user.id, message });
      redis.publish(room, JSON.stringify({ user: user.id, message }));
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${user.id}`);
    });
  });
};
