/*

Written by Andrew Perera
Copyright 2020

*/

import gql from "graphql-tag";

export const CREATE_USER = gql`
  mutation CreateUser($username: String!) {
    createUser(userInput: { username: $username }) {
      userId
      username
      token
      tokenExpiration
    }
  }
`;

export const CREATE_CHAT = gql`
  mutation CreateChat($name: String!, $description: String!) {
    createChat(chatInput: { name: $name, description: $description }) {
      _id
      name
      description
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation CreateMessage($message: String!, $chatId: String!) {
    createMessage(messageInput: { message: $message, chatId: $chatId }) {
      message
      timestamp
      createdBy {
        username
      }
    }
  }
`;
