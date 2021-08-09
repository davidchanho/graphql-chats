import { IChannel } from "../channels";
import { IUser } from "../users";

export interface IMessage {
  _id?: string;
  text: string;
  user: IUser;
  channel: IChannel;
  date?: string;
  bookmarkedBy?: IUser[];
}
