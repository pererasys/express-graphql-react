/*

Written by Andrew Perera
Copyright 2020

*/

import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_MESSAGES } from "../../graphql/queries";
import MessageList from "../messages/MessageList";
import { ClipLoader } from "react-spinners";

const ActiveChat = () => {
  const { chatId } = useParams();
  const { loading, error, data } = useQuery(GET_MESSAGES, {
    variables: { chatId }
  });
  console.log(data);
  if (loading)
    return (
      <div className="flexc full center">
        <ClipLoader size={50} color="#ffffff" />
      </div>
    );
  return (
    <div className="flexc full">
      <MessageList messages={data.messages} />
    </div>
  );
};

export default ActiveChat;
