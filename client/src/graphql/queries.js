/*

Written by Andrew Perera
Copyright 2020

*/

import gql from "graphql-tag";

export const GET_CHATS = gql`
  query {
    chats {
      _id
      name
      description
    }
  }
`;

export const GET_MESSAGES = gql`
  query Messages($chatId: String!) {
    messages(chatId: $chatId) {
      message
      timestamp
      createdBy {
        username
      }
    }
  }
`;
