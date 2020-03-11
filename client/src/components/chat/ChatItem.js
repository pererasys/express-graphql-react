/*

Written by Andrew Perera
Copyright 2020

*/

import React from "react";
import { Link } from "react-router-dom";

const ChatItem = ({ chat }) => {
  return (
    <Link to={`/chat/${chat._id}`} style={{ textDecoration: "none" }}>
      <div className="flexc p-2 bottom-border">
        <h4>{chat.name}</h4>
        <p className="body-text-2">{chat.description}</p>
      </div>
    </Link>
  );
};

export default ChatItem;
