const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type Chat {
    _id: ID!
    name: String!
    description: String!
    createdBy: User!
    createdAt: String!
    updatedAt: String!
}

type Message {
  _id: ID!
  chat: Chat!
  message: String!
  timestamp: String!
}

type User {
  _id: ID!
  username: String!
}

type AuthData {
  userId: ID!
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

type RootQuery {
    chats: [Chat!]!
    messages: [Message!]!
}

type RootMutation {
    createUser(userInput: UserInput): User
    createChat(chatInput: ChatInput): Chat
    createMessage(messageInput: MessageInput): Message
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
