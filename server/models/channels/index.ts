import mongoose from "mongoose";
import { IChannel } from "./../../../shared/types/channels/index";

const channelSchema = new mongoose.Schema<IChannel>(
  {
    name: {
      type: String,
      required: true,
      // unique: true
    },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "message" }],
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  {
    timestamps: true,
  }
);

const Channel = mongoose.model<IChannel>("channel", channelSchema);

export default Channel;
