import express from 'express';
import chatRoutes from './routes/chat.routes';

const app = express();

app.use(express.json());

app.use('/api/chats', chatRoutes);

export default app;
