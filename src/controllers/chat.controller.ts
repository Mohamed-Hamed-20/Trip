import { Request, Response, NextFunction, RequestHandler } from 'express';
import Chat, { IChat } from '../models/chat.model';

export const createChat: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { participants, chatType } = req.body;
    const chat: IChat = new Chat({ participants, chatType, messages: [] });
    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getChat: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) {
      res.status(404).json({ error: 'Chat not found' });
      return;
    }
    res.json(chat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
