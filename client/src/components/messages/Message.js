/*

Written by Andrew Perera
Copyright 2020

*/

import React from "react";

const Message = ({ message: messageObj }) => {
  const {
    message,
    timestamp,
    createdBy: { username }
  } = messageObj;
  return (
    <div className="flexr j-between a-center p-2">
      <div>
        <h4>{username}</h4>
        <p className="body-text-2">{message}</p>
      </div>
      <p className="body-text-2">{timestamp}</p>
    </div>
  );
};

export default Message;
