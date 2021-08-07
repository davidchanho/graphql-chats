import { IChannel } from "./../../../shared/types/channels/index";
import { IMessage } from "./../../../shared/types/messages/index";
import { IUser } from "./../../../shared/types/users/index";

export interface ChannelProps {
  channel: IChannel;
}

export interface ChannelsProps {
  channels: IChannel[];
}

export interface UsersProps {
  users: IUser[];
}

export interface UserProps {
  user: IUser;
}

export interface MessagesProps {
  messages: IMessage[];
}

export interface MessageProps {
  message: IMessage;
}
