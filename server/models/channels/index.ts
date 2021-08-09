import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    date: { type: String, default: new Date().toString() },
  },
  {
    timestamps: true,
  }
);

const Channel = mongoose.model("channel", channelSchema);

export default Channel;
