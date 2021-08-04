import API from "../../api";

const model = "Channel";

const Query = {
  channels: API.fetchMany(model),
  channel: API.fetchOne(model),
};

const Channel = {
  users: (parent: any, args: any, { User }: any) => {
    return User.find({ channel: parent._id });
  },
  messages: (parent: any, args: any, { Message }: any) => {
    return Message.find({ channel: parent._id });
  },
};

const Mutation = {
  addChannel: API.addOne(model),
  removeChannel: API.removeOne(model),
  updateChannel: API.updateOne(model),
};

export const resolvers = {
  Query,
  Channel,
  Mutation,
};
