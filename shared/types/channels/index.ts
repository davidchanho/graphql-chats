import { IMessage } from "./../messages/index";
import { IUser } from "./../users/index";
export interface IChannel {
  _id?: string;
  name: string;
  messages?: IMessage[];
  users?: IUser[];
  createdAt?: string;
}
