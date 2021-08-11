const controllers = {
  fetchMany(model: any) {
    return (parent: any, args: any, { models }: any) => models[model].find({});
  },
  fetchOne(model: any) {
    return (parent: any, { _id }: any, { models }: any) =>
      models[model].findById(_id);
  },
  add(model: any) {
    return async (parent: any, { item }: any, { models }: any) => {
      try {
        const newItem = new models[model](item);
        return newItem.save();
      } catch (err) {
        console.log(err);
      }
    };
  },
  remove(model: any) {
    return async (parent: any, { _id }: any, { models }: any) => {
      try {
        await models[model].findOneAndRemove(_id);
      } catch (err) {
        console.log(err);
      }
    };
  },
  update(model: any) {
    return async (parent: any, { _id, update }: any, { models }: any) => {
      return await models[model].findOneAndUpdate({ _id }, JSON.parse(update));
    };
  },
};

export default controllers;
