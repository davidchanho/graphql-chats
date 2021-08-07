import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  bookmarks: [{ type: Schema.Types.ObjectId, ref: "message" }],
  channels: [{ type: Schema.Types.ObjectId, ref: "channel" }],
  date: { type: String, default: new Date().toString() },
});

const User = mongoose.model("user", userSchema);

export default User;
