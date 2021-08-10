import _ from "lodash";
import client from "../client";
import models from "../models";
import { closeDB, createChannel, createMessage, createUser } from "./helpers";

async function createMessages(channel: any, user: any) {
  const newMessage = createMessage();
  const message = await new models.Message(newMessage);

  channel.messages.push(message);

  user.messages.push(message);

  message.channel = channel;
  message.user = user;

  Promise.all([message.save()]);
}

_.times(5, async function seed() {
  (await client()).connection.db.dropDatabase();

  const newChannel = createChannel();
  const channel = await new models.Channel(newChannel);

  const newUser = createUser();
  const user = await new models.User(newUser);

  channel.users.push(user);
  user.channels.push(channel);

  _.times(10, () => createMessages(channel, user));

  closeDB([channel.save(), user.save()]);
});
