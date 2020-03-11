// Written by Andrew Perera
// Copyright 2020

const Message = require("../../models/message");
const { transformMessage } = require("./transform");
const { PubSub, AuthenticationError } = require("apollo-server-express");

const pubsub = new PubSub();

const NEW_MESSAGE = "NEW_MESSAGE";

module.exports = {
  Mutation: {
    createMessage: async (root, args, context) => {
      try {
        if (!req.isAuthenticated) {
          throw new AuthenticationError("Unauthenticated request.");
        }

        const { messageInput } = args;
        const message = new Message({
          message: messageInput.message,
          timestamp: new Date(),
          chat: messageInput.chatId,
          createdBy: req.userId
        });

        const result = await message.save();
        return result;
      } catch (err) {
        throw err;
      }
    }
  },
  Query: {
    messages: async (root, args, context) => {
      try {
        const messages = await Message.find();
        return messages.map(message => {
          return transformMessage(message);
        });
      } catch (err) {
        throw err;
      }
    }
  },
  Subscription: {
    newMessage: {
      subscribe: () => pubsub.asyncIterator([NEW_MESSAGE])
    }
  }
};
