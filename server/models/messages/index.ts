import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "channel",
    required: true,
  },
  date: { type: String, default: new Date().toString() },
});

const Message = mongoose.model("message", messageSchema);

export default Message;
