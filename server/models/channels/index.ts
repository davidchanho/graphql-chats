import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "message" }],
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  {
    timestamps: true,
  }
);

const Channel = mongoose.model("channel", channelSchema);

export default Channel;
