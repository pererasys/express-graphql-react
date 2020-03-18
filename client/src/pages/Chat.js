/*

Written by Andrew Perera
Copyright 2020

*/

import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_CHATS } from "../graphql/queries";
import ChatList from "../components/chat/ChatList";
import ActiveChat from "../components/chat/ActiveChat";
import NoChatSelected from "../components/chat/NoChatSelected";
import { ClipLoader } from "react-spinners";
import CreateChat from "../components/chat/CreateChat";

const Chat = props => {
  const { loading, error, data } = useQuery(GET_CHATS);
  const token = localStorage.getItem("token");
  if (!token) return <Redirect to="/" from="/chat" />;
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
        <Route
          path={`${props.match.path}/create`}
          exact
          component={CreateChat}
        />
        <Route
          path={`${props.match.path}/active/:chatId`}
          component={ActiveChat}
        />
      </Switch>
    </div>
  );
};

export default Chat;
