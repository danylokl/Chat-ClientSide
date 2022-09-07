import { User } from './user.models';

export interface Chat {
  chatId: number;
  chatName: string;
  users: User[];
  // messages: Message[];
}
