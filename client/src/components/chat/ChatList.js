/*

Written by Andrew Perera
Copyright 2020

*/

import React from "react";
import { AddRounded } from "@material-ui/icons";
import "./ChatList.css";
import ChatItem from "./ChatItem";

const ChatList = ({ chats }) => {
  return (
    <div className="flexc container right-border">
      <div className="flexr a-center j-between bottom-border p-2">
        <h2>All Chats</h2>
        <AddRounded style={{ fontSize: 32, color: "#3f01bc" }} />
      </div>
      {chats.map((chat, index) => (
        <ChatItem chat={chat} key={index} />
      ))}
    </div>
  );
};

export default ChatList;
