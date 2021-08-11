import controllers from "../../controllers";

const model = "Channel";

const Query = {
  channels: controllers.fetchMany(model),
  channel: controllers.fetchOne(model),
};

const Mutation = {
  addChannel: controllers.add(model),
  removeChannel: controllers.remove(model),
  updateChannel: controllers.update(model),
};

export const resolvers = {
  Query,
  Mutation,
};
