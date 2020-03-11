// Written by Andrew Perera
// Copyright 2020

const authResolver = require("./auth");
const chatsResolver = require("./chats");
const messagesResolver = require("./messages");

const resolvers = {
  Mutation: {
    ...authResolver.Mutation,
    ...chatsResolver.Mutation,
    ...messagesResolver.Mutation
  },
  Query: {
    ...chatsResolver.Query,
    ...messagesResolver.Query
  }
};

module.exports = resolvers;
