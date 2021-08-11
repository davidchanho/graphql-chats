import { IChannel } from "../channels";
import { IUser } from "../users";

export interface IMessage {
  _id?: string;
  text: string;
  user: IUser;
  channel: IChannel;
  bookmarkedBy?: IUser[];
  createdAt?: string;
  updatedAt?: string;
}
