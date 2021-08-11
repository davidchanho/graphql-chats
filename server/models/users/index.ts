import mongoose, { Schema } from "mongoose";
import { IUser } from "../../../shared/types/users";

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String },
    email: {
      type: String,
      required: true,
      // unique: true
    },
    password: { type: String, required: true },
    avatar: { type: String },
    messages: [{ type: Schema.Types.ObjectId, ref: "message" }],
    bookmarks: [{ type: Schema.Types.ObjectId, ref: "message" }],
    channels: [{ type: Schema.Types.ObjectId, ref: "channel" }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("user", userSchema);

export default User;
