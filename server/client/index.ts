import mongoose from "mongoose";

const client = () =>
  mongoose.connect("mongodb://localhost:27017/chats", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

export default client;
