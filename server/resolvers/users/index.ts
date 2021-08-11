import { AuthenticationError } from "apollo-server-express";
import gravatar from "gravatar";
import { checkPassword, generateJWT, hashPassword } from "../../auth";
import controllers from "../../controllers";

interface IUserInput {
  name: string;
  email: string;
  password: string;
}

const model = "User";

const Query = {
  users: controllers.fetchMany(model),
  user: controllers.fetchOne(model),
  me: async (parent: any, args: any, { models, user }: any) => {
    return await models.User.findById(user._id);
  },
};

const User = {
  messages: (parent: any, args: any, { models }: any) => {
    return models.Message.find({ _id: { $in: parent.messages } });
  },
  bookmarks: (parent: any, args: any, { models }: any) => {
    return models.Message.find({ _id: { $in: parent.bookmarks } });
  },
  channels: (parent: any, args: any, { models }: any) => {
    return models.Channel.find({ _id: { $in: parent.channels } });
  },
};

const Mutation = {
  loginUser: async (
    parent: any,
    { email, password }: IUserInput,
    { models }: any
  ) => {
    if (email) {
      email = email.trim().toLowerCase();
    }

    const user = await models.User.findOne({ email });

    if (!user) {
      throw new AuthenticationError("Error signing in");
    }

    const valid = await checkPassword(password, user.password);

    if (!valid) {
      throw new AuthenticationError("Error signing in");
    }

    return generateJWT(user);
  },
  registerUser: async (
    parent: any,
    { name, email, password }: IUserInput,
    { models: { User } }: any
  ) => {
    email = email.trim().toLowerCase();

    const hashed = await hashPassword(password);
    const avatar = gravatar.url(email);

    try {
      const user = await User.create({
        name,
        email,
        avatar,
        password: hashed,
      });

      return generateJWT(user);
    } catch (err) {
      console.log(err);
      throw new Error("Error creating account");
    }
  },
  removeUser: controllers.remove(model),
  updateUser: controllers.update(model),
};

export const resolvers = {
  Query,
  User,
  Mutation,
};
