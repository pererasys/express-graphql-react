/*

Written by Andrew Perera
Copyright 2020

*/

import React, { useState } from "react";
import { AddRounded } from "@material-ui/icons";
import "./ChatList.css";
import ChatItem from "./ChatItem";
import { Link } from "react-router-dom";

const ChatList = ({ chats }) => {
  const [showModal, setShowModal] = useState(false);
  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleModalOpen = event => {
    event.preventDefault();
    setShowModal(true);
  };

  return (
    <div className="flexc container right-border">
      <div className="flexr a-center j-between bottom-border p-2">
        <h2>All Chats</h2>
        <Link to="/chat/create" from="/chat">
          <AddRounded style={{ fontSize: 32, color: "#3f01bc" }} />
        </Link>
      </div>
      {chats.map((chat, index) => (
        <ChatItem chat={chat} key={index} />
      ))}
    </div>
  );
};

export default ChatList;
