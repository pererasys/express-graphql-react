/*

Written by Andrew Perera
Copyright 2020

*/

import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_MESSAGES } from "../../graphql/queries";
import { NEW_MESSAGE } from "../../graphql/subscriptions";
import MessageList from "../messages/MessageList";
import NewMessage from "../messages/NewMessage";
import { ClipLoader } from "react-spinners";

const ActiveChat = () => {
  const { chatId } = useParams();
  const { loading, data, subscribeToMore } = useQuery(GET_MESSAGES, {
    variables: { chatId },
    onError: error => console.log(error)
  });
  return (
    <div className="flexc full j-end">
      {loading ? (
        <div className="flexc full center">
          <ClipLoader size={50} color="#ffffff" />
        </div>
      ) : (
        <MessageList
          messages={data.messages}
          subscribeToNewMessages={() =>
            subscribeToMore({
              document: NEW_MESSAGE,
              variables: { chatId },
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const messageData = subscriptionData.data.newMessage;
                return Object.assign({}, prev, {
                  messages: [messageData, ...prev.messages]
                });
              },
              onError: error => console.log(error.message)
            })
          }
        />
      )}
      <NewMessage />
    </div>
  );
};

export default ActiveChat;
