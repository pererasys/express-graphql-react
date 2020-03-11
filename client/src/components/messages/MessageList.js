/*

Written by Andrew Perera
Copyright 2020

*/

import React from "react";
import Message from "./Message";

const MessageList = ({ messages }) => {
  return (
    <div className="flexc-reverse full">
      {messages.map((message, index) => (
        <Message message={message} key={index} />
      ))}
    </div>
  );
};

export default MessageList;
