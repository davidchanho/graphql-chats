import { IMessage } from './../messages/index';
export interface IChannel {
  _id?: string;
  name: string;
  date: string;
  messages?: IMessage[]
}
