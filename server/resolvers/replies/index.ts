import { AuthenticationError, ForbiddenError } from "apollo-server-express";
import mongoose from "mongoose";
import controllers from "../../controllers";

const model = "Reply";

// const pubsub = new PubSub();

const Query = {
  replies: (parent: any, args: any, { models }: any) => {
    return models.Reply.find({});
  },
  reply: controllers.fetchOne(model),
  replyFeed: async (parent: any, args: any, { models }: any) => {
    const limit = 10;
    let hasNextPage = false;
    let cursorQuery = {};

    if (args.cursor) {
      cursorQuery = { _id: { $lt: args.cursor } };
    }

    let replies = await models.Reply.find(cursorQuery)
      .sort({ _id: -1 })
      .limit(limit + 1);

    if (replies.length > limit) {
      hasNextPage = true;
      replies = replies.slice(0, -1);
    }

    const newCursor = replies[replies.length - 1]._id;

    return {
      replies,
      cursor: newCursor,
      hasNextPage,
    };
  },
};

const Reply = {
  user: (parent: any, args: any, { models }: any) => {
    return models.User.findById(parent.user);
  },
  message: (parent: any, args: any, { models }: any) => {
    return models.Reply.find({ message: parent.message });
  },
};

// const Subscription = {
//   replyCreated: {
//     subscribe: () => pubsub.asyncIterator(["REPLY_CREATED"]),
//   },
// };

const Mutation = {
  addReply: async (parent: any, args: any, { models, user }: any) => {
    if (!user) {
      throw new AuthenticationError("You must be signed in to create a reply");
    }

    try {
      await models.Reply.create({
        text: args.text,
        user: mongoose.Types.ObjectId(user._id),
        message: args.message,
      });
    } catch (err) {
      console.log(err);
    }
  },
  removeReply: async (parent: any, args: any, { models, user }: any) => {
    if (!user) {
      throw new AuthenticationError("You must be signed in to delete a reply");
    }

    const reply = await models.Reply.findById(args._id);

    if (reply && String(reply.user) !== user._id) {
      throw new ForbiddenError(
        "You don't have permissions to delete the reply"
      );
    }

    try {
      await reply.remove();
      return true;
    } catch (err) {
      return false;
    }
  },
  updateReply: async (parent: any, args: any, { models, user }: any) => {
    if (!user) {
      throw new AuthenticationError("You must be signed in to update a reply");
    }

    const reply = await models.Reply.findById(args._id);

    if (reply && String(reply.user) !== user._id) {
      throw new ForbiddenError(
        "You don't have permissions to update the reply"
      );
    }

    return await models.Reply.findOneAndUpdate(
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
  Reply,
  Mutation,
  // Subscription,
};
