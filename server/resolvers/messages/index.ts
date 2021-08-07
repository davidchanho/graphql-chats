import controllers from "../../controllers";
import db from "../../models";

const model = db.Message;
// const pubsub = new PubSub();

const Query = {
  messages: (parent: any, args: any, context: any) => {
    return model
      .find({ channel: args.channel })
      .limit(args.limit)
      .skip(args.offset)
      .sort("date");
  },
  message: controllers.fetchOne(model),
};

const Message = {
  user: (parent: any, args: any, context: any) => {
    return db.User.findById(parent.user);
  },
  channel: (parent: any, args: any, context: any) => {
    return db.Channel.findById(parent.channel);
  },
};

// const Subscription = {
//   messageCreated: {
//     subscribe: () => pubsub.asyncIterator(["MESSAGE_CREATED"]),
//   },
// };

const Mutation = {
  addMessage: async (parent: any, args: any, context: any) => {
    try {
      // pubsub.publish("MESSAGE_CREATED", { messageCreated: args });
      return await db.Message.create(args.item);
    } catch (err) {
      console.log(err);
    }
  },
  removeMessage: controllers.removeOne(model),
  updateMessage: controllers.updateOne(model),
};

export const resolvers = {
  Query,
  Message,
  Mutation,
  // Subscription,
};
