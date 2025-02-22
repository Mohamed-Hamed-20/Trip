import express, { NextFunction, Request, Response } from 'express';
import chatRoutes from './routes/chat.routes';

const app = express();

app.use(express.json());
app.get("/", async (req, res, next) => {
    res.json({ message: "hello world !" });
 })
app.use('/api/chats', chatRoutes);

export default app;
