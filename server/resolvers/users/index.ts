import jwt from "jsonwebtoken";
import API from "../../api";

const model = "User";

const Query = {
  users: API.fetchMany(model),
  user: API.fetchOne(model),
};

const User = {
  messages: (parent: any, args: any, { Message }: any) => {
    return Message.find({ _id: { $in: parent.messages } });
  },
  bookmarks: (parent: any, args: any, { Message }: any) => {
    return Message.find({ _id: { $in: parent.bookmarks } });
  },
  channels: (parent: any, args: any, { Channel }: any) => {
    return Channel.find({ _id: { $in: parent.channels } });
  },
};

const Mutation = {
  login: async (parent: any, args: any, { User }: any) => {
    const user = await User.find({ email: args.email });

    if (user) {
      const token = jwt.sign({ _id: user._id }, "secret", {
        algorithm: "HS256",
      });

      return token;
    }
  },
  addUser: API.addOne(model),
  removeUser: API.removeOne(model),
  updateUser: API.updateOne(model),
};

export const resolvers = {
  Query,
  User,
  Mutation,
};
