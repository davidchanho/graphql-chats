import { IUser } from "../users";
import { IMessage } from "./../messages/index";

export interface IReply {
  _id?: string;
  text: string;
  user: IUser;
  message: IMessage;
  bookmarkedBy?: IUser[];
  createdAt?: string;
  updatedAt?: string;
}
