import faker from "faker";
import mongoose from 'mongoose';
import client from "../client";
import db from "../models";
import { IMessage } from "./../../shared/types/messages/index";
import { IUser } from "./../../shared/types/users/index";
const messages: IMessage[] = [];
const users: IUser[] = [];

(async function seedChannels() {
  client();
  const name = faker.lorem.words();
  const newChannel = {
    name,
  };
  const channel = await new db.Channel(newChannel);
  return channel.save();
})();

(async function seedUsers() {
  client();
  const _id = new mongoose.Types.ObjectId()
  const name = faker.lorem.words();
  const email = faker.lorem.word();
  const password = faker.lorem.word();

  const newUser = {
    _id,
    name,
    email,
    password,
  };
  const user = await new db.User(newUser);
  return user.save();
})();

(async function seedMessages() {
  client();
  const text = faker.lorem.words(); 
  const newMessage = {
    text,
  };
  const message = await new db.Message(newMessage);
  return message.save();
})();
