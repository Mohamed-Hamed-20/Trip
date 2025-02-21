import { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  sender: string;
  text: string;
  createdAt: Date;
}

export const MessageSchema = new Schema<IMessage>({
  sender: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
