import { Schema, model, Document } from 'mongoose';
import { IMessage, MessageSchema } from './message.model';

export type ChatType = 'private' | 'group';

export interface IChat extends Document {
  participants: string[];
  chatType: ChatType;
  messages: IMessage[];
  createdAt: Date;
}

const ChatSchema = new Schema<IChat>({
  participants: [{ type: String, required: true }],
  chatType: { type: String, enum: ['private', 'group'], default: 'private' },
  messages: [MessageSchema],
  createdAt: { type: Date, default: Date.now },
});

export default model<IChat>('Chat', ChatSchema);
