/*

Written by Andrew Perera
Copyright 2020

*/

import React, { useEffect } from "react";
import Message from "./Message";

const MessageList = ({ messages, subscribeToNewMessages }) => {
  useEffect(subscribeToNewMessages, []);
  return (
    <div style={{ overflowY: "scroll" }} className="flexc-reverse">
      {messages.map((message, index) => (
        <Message message={message} key={index} />
      ))}
    </div>
  );
};

export default MessageList;
