/*

Written by Andrew Perera
Copyright 2020

*/

import React from "react";
import { Switch, Route } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_CHATS } from "../graphql/queries";
import ChatList from "../components/chat/ChatList";
import ActiveChat from "../components/chat/ActiveChat";
import NoChatSelected from "../components/chat/NoChatSelected";
import { ClipLoader } from "react-spinners";

const Chat = props => {
  const { loading, error, data } = useQuery(GET_CHATS);
  if (loading)
    return (
      <div className="flexc full center">
        <ClipLoader size={50} color="#ffffff" />
      </div>
    );
  return (
    <div className="flexr full">
      <ChatList chats={data.chats} />
      <Switch>
        <Route path={props.match.path} exact component={NoChatSelected} />
        <Route path={`${props.match.path}/:chatId`} component={ActiveChat} />
      </Switch>
    </div>
  );
};

export default Chat;
