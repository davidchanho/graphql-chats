const controllers = {
  fetchMany(db: any) {
    return (parent: any, args: any, context: any) => db.find({});
  },
  fetchOne(db: any) {
    return (parent: any, args: any, context: any) => db.findById(args._id);
  },
  addOne(db: any) {
    return async (parent: any, args: any, context: any) => {
      try {
        const item = new db(args.item);
        return item.save();
      } catch (err) {
        console.log(err);
      }
    };
  },
  removeOne(db: any) {
    return async (parent: any, args: any, context: any) => {
      try {
        await db.findOneAndRemove(args._id);
      } catch (err) {
        console.log(err);
      }
    };
  },
  updateOne(db: any) {
    return async (parent: any, args: any, context: any) => {
      return await db.findOneAndUpdate(
        { _id: args._id },
        JSON.parse(args.update)
      );
    };
  },
};

export default controllers;
