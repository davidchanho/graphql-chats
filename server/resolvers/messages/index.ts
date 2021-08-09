import { AuthenticationError, ForbiddenError } from "apollo-server-express";
import mongoose from "mongoose";

// const pubsub = new PubSub();

const Query = {
  messages: (parent: any, args: any, { models }: any) => {
    return models.Message.find({});
  },
  message: (parent: any, args: any, { models }: any) => {
    return models.Message.findById(args._id);
  },
  messageFeed: async (parent: any, args: any, { models }: any) => {
    const limit = 10;
    let hasNextPage = false;
    let cursorQuery = {};

    if (args.cursor) {
      cursorQuery = { _id: { $lt: args.cursor } };
    }

    let messages = await models.Message.find(cursorQuery)
      .sort({ _id: -1 })
      .limit(limit + 1);

    if (messages.length > limit) {
      hasNextPage = true;
      messages = messages.slice(0, -1);
    }

    const newCursor = messages[messages.length - 1]._id;

    return {
      messages,
      cursor: newCursor,
      hasNextPage,
    };
  },
};

const Message = {
  user: (parent: any, args: any, { models }: any) => {
    return models.User.findById(parent.user);
  },
  channel: (parent: any, args: any, { models }: any) => {
    return models.Message.find({ channel: parent.channel });
  },
};

// const Subscription = {
//   messageCreated: {
//     subscribe: () => pubsub.asyncIterator(["MESSAGE_CREATED"]),
//   },
// };

const Mutation = {
  addMessage: async (parent: any, args: any, { models, user }: any) => {
    if (!user) {
      throw new AuthenticationError(
        "You must be signed in to create a message"
      );
    }

    try {
      await models.Message.create({
        text: args.text,
        user: mongoose.Types.ObjectId(user._id),
        channel: args.channel,
      });
    } catch (err) {
      console.log(err);
    }
  },
  removeMessage: async (parent: any, args: any, { models, user }: any) => {
    if (!user) {
      throw new AuthenticationError(
        "You must be signed in to delete a message"
      );
    }

    const message = await models.Message.findById(args._id);

    if (message && String(message.user) !== user._id) {
      throw new ForbiddenError(
        "You don't have permissions to delete the message"
      );
    }

    try {
      await message.remove();
      return true;
    } catch (err) {
      return false;
    }
  },
  updateMessage: async (parent: any, args: any, { models, user }: any) => {
    if (!user) {
      throw new AuthenticationError(
        "You must be signed in to update a message"
      );
    }

    const message = await models.Message.findById(args._id);

    if (message && String(message.user) !== user._id) {
      throw new ForbiddenError(
        "You don't have permissions to update the message"
      );
    }

    return await models.Message.findOneAndUpdate(
      {
        _id: args._id,
      },
      {
        $set: {
          text: args.text,
        },
      },
      {
        new: true,
      }
    );
  },
};

export const resolvers = {
  Query,
  Message,
  Mutation,
  // Subscription,
};
