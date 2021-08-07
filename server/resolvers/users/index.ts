import bcrypt from "bcrypt";
import controllers from "../../controllers";
import db from "../../models";

const model = db.User;

const Query = {
  users: controllers.fetchMany(model),
  user: controllers.fetchOne(model),
};

const User = {
  messages: (parent: any, args: any, context: any) => {
    return db.Message.find({ _id: { $in: parent.messages } });
  },
  bookmarks: (parent: any, args: any, context: any) => {
    return db.Message.find({ _id: { $in: parent.bookmarks } });
  },
  channels: (parent: any, args: any, context: any) => {
    return db.Channel.find({ _id: { $in: parent.channels } });
  },
};

interface IUser {
  email: string;
  password: string;
}

const Mutation = {
  login: async (parent: any, args: any, context: any) => {},
  addUser: async (parent: any, args: IUser) => {
    const hashed = await bcrypt.hash(args.password, 10);
    return await db.User.create({
      email: args.email,
      password: hashed,
    });
  },
  removeUser: controllers.removeOne(model),
  updateUser: controllers.updateOne(model),
};

export const resolvers = {
  Query,
  User,
  Mutation,
};
