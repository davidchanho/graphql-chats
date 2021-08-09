import { IMessage } from "./../messages/index";
import { IUser } from "./../users/index";
export interface IChannel {
  _id?: string;
  name: string;
  date?: string;
  messages?: IMessage[];
  users?: IUser[];
}
