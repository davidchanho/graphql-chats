import { PubSub } from "graphql-subscriptions";
import API from "../../api";

const model = "Message";
const pubsub = new PubSub();

const Query = {
  messages: (parent: any, args: any, context: any) => {
    return context[model]
      .find()
      .limit(args.limit)
      .skip(args.offset)
      .sort("date");
  },
  message: API.fetchOne(model),
};

const Message = {
  user: (parent: any, args: any, { User }: any) => {
    return User.findById(parent.user);
  },
  channel: (parent: any, args: any, { Channel }: any) => {
    return Channel.findById(parent.channel);
  },
};

const Subscription = {
  messageCreated: {
    subscribe: () => pubsub.asyncIterator(["MESSAGE_CREATED"]),
  },
};

const Mutation = {
  addMessage: async (parent: any, args: any, context: any) => {
    try {
      pubsub.publish("MESSAGE_CREATED", { messageCreated: args });
      const item = new context.Message(args.item);
      return await item.save();
    } catch (err) {
      console.log(err);
    }
  },
  removeMessage: API.removeOne(model),
  updateMessage: API.updateOne(model),
};

export const resolvers = {
  Query,
  Message,
  Mutation,
  Subscription,
};
