// Written by Andrew Perera
// Copyright 2020

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  },
  chat: {
    type: Schema.Types.ObjectId,
    ref: "Chat",
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = mongoose.model("ChatMessage", messageSchema);
