import controllers from "../../controllers";
const model = "Channel";

const Query = {
  channels: (parent: any, args: any, { models }: any) => {
    return models.Channel.find({});
  },
  channel: (parent: any, args: any, { models }: any) => {
    return models.Channel.findById(args._id);
  },
};

const Channel = {
  users: async (parent: any, args: any, { models }: any) => {
    return models.Channel.findById(parent._id).populate('user');
  },
  messages: (parent: any, args: any, { models }: any) => {
    return models.Message.find({ channel: parent._id });
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
