/*

Written by Andrew Perera
Copyright 2020

*/

import gql from "graphql-tag";

export const NEW_MESSAGE = gql`
  subscription NewMessage($chatId: String!) {
    newMessage(chatId: $chatId) {
      _id
      message
      timestamp
      createdBy {
        username
      }
    }
  }
`;
