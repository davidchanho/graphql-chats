import controllers from "../../controllers";
import db from "../../models";

const model = db.Channel;

const Query = {
  channels: controllers.fetchMany(model),
  channel: controllers.fetchOne(model),
};
const Channel = {
  users: async (parent: any, args: any, context: any) => {
    return db.Message.find({ channel: parent._id });
  },
  messages: (parent: any, args: any, context: any) => {
    return db.Message.find({ channel: parent._id });
  },
};

const Mutation = {
  addChannel: controllers.addOne(model),
  removeChannel: controllers.removeOne(model),
  updateChannel: controllers.updateOne(model),
};

export const resolvers = {
  Query,
  Channel,
  Mutation,
};
