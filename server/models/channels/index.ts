import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, default: new Date().toString() },
});

const Channel = mongoose.model("channel", channelSchema);

export default Channel;
