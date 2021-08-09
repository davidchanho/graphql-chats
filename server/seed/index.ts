import _ from "lodash";
import client from "../client";
import models from "../models";
import { closeDB, createChannel, createMessage, createUser } from "./helpers";

_.times(5, async function seed() {
  client();

  const newChannel = createChannel();
  const channel = await new models.Channel(newChannel);

  const newUser = createUser();
  const user = await new models.User(newUser);

  channel.users.push(user);
  user.channels.push(channel);

  const newMessage = createMessage();
  const message = await new models.Message(newMessage);

  channel.messages.push(message);

  user.messages.push(message);

  message.channel = channel;
  message.user = user;

  closeDB([channel.save(), user.save(), message.save()]);
});
