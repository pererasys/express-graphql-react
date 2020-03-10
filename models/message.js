const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  chat: {
    type: Schema.Types.ObjectId,
    ref: "Chat"
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  timestamp: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("ChatMessage", messageSchema);
