/*

Written by Andrew Perera
Copyright 2020

*/

const { gql } = require("apollo-server-express");

module.exports = gql(`
type Chat {
    _id: ID!
    name: String!
    description: String!
    timestamp: String!
}

type Message {
  _id: ID!
  chat: Chat!
  message: String!
  timestamp: String!
  createdBy: User!
}

type User {
  _id: ID!
  username: String!
}

type AuthData {
  userId: ID!
  username: String!
  token: String!
  tokenExpiration: Int!
}

input UserInput {
  username: String!
}

input ChatInput {
  name: String!
  description: String!
}

input MessageInput {
  message: String!
  chatId: String!
}

type Query {
    chats: [Chat!]!
    messages(chatId: String!): [Message!]!
}

type Mutation {
    createUser(userInput: UserInput): AuthData
    createChat(chatInput: ChatInput): Chat
    createMessage(messageInput: MessageInput): Message
}

type Subscription {
  newMessage(chatId: String!): Message!
}
`);
