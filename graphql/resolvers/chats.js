// Written by Andrew Perera
// Copyright 2020

const Chat = require("../../models/chat");
const { transformChat } = require("./transform");
const {
  AuthenticationError,
  UserInputError
} = require("apollo-server-express");

module.exports = {
  Mutation: {
    createChat: async (root, args, context) => {
      try {
        const { req } = context;
        if (!req.isAuthenticated) {
          throw new AuthenticationError("Unauthenticated request.");
        }
        const { name, description } = args.chatInput;

        const existingChat = await Chat.findOne({
          name
        });
        if (existingChat) {
          throw new UserInputError("A chat with this name already exists.");
        }
        const chat = new Chat({
          name,
          description,
          timestamp: new Date(),
          createdBy: req.userId
        });

        const result = await chat.save();
        return result;
      } catch (err) {
        throw err;
      }
    }
  },
  Query: {
    chats: async (root, args, context) => {
      try {
        const chats = await Chat.find();
        return chats.map(chat => {
          return transformChat(chat);
        });
      } catch (err) {
        throw err;
      }
    }
  }
};
