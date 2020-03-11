/*

Written by Andrew Perera
Copyright 2020

*/

import React from "react";
import { ChatRounded } from "@material-ui/icons";

const NoChatSelected = () => {
  return (
    <div className="flexc full center">
      <ChatRounded style={{ fontSize: 250, color: "#2a2a2a" }} />
    </div>
  );
};

export default NoChatSelected;
