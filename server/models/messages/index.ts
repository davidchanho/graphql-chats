import { IMessage } from './../../../shared/types/messages/index';
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema<IMessage>(
  {
    text: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      //  required: true
    },
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "channel",
      // required: true,
    },
    bookmarkedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model<IMessage>("message", messageSchema);

export default Message;
