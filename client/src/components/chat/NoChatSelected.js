/*

Written by Andrew Perera
Copyright 2020

*/

import React from "react";
import { ChatRounded } from "@material-ui/icons";

const NoChatSelected = () => {
  const username = localStorage.getItem("username");
  return (
    <div className="flexc full center">
      <ChatRounded style={{ fontSize: 250, color: "#2a2a2a" }} />
      <p className="body-text-1">Welcome, {username}.</p>
    </div>
  );
};

export default NoChatSelected;
