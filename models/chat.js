const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chatSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Chat", chatSchema);
