/*

Written by Andrew Perera
Copyright 2020

*/

const Message = require("../../models/message");
const { transformMessage } = require("./transform");
const {
  AuthenticationError,
  UserInputError
} = require("apollo-server-express");
const pubsub = require("../../pubsub");
const { withFilter } = require("graphql-subscriptions");

const NEW_MESSAGE = "NEW_MESSAGE";

module.exports = {
  Mutation: {
    createMessage: async (root, args, context) => {
      try {
        const { req } = context;
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

        const transformedResult = transformMessage(result);

        pubsub.publish(NEW_MESSAGE, { newMessage: transformedResult });

        return transformedResult;
      } catch (err) {
        throw err;
      }
    }
  },
  Query: {
    messages: async (root, args, context) => {
      try {
        const { req } = context;
        if (!req.isAuthenticated) {
          throw new AuthenticationError("Unauthenticated request.");
        }
        const { chatId } = args;
        if (!chatId) throw new UserInputError("Must provide a chat ID.");
        const messages = await Message.find({ chat: chatId }).sort({
          timestamp: -1
        });
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
      subscribe: withFilter(
        () => pubsub.asyncIterator(NEW_MESSAGE),
        ({ newMessage }, { chatId }) => {
          return newMessage.chat.toString() === chatId;
        }
      )
    }
  }
};
