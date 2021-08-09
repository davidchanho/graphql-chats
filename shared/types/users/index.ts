import { IMessage } from "../messages";
import { IChannel } from "./../channels/index";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  messages: IMessage[];
  bookmarks: IMessage[];
  channels: IChannel[];
  createdAt: string;
}
