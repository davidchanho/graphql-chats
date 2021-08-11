import mongoose from "mongoose";
import { IReply } from "../../../shared/types/replies";

const repliesSchema = new mongoose.Schema<IReply>(
  {
    text: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      //  required: true
    },
    message: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message",
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

const Reply = mongoose.model<IReply>("replies", repliesSchema);

export default Reply;
