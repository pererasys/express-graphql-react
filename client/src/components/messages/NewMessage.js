/*

Written by Andrew Perera
Copyright 2020

*/

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_MESSAGE } from "../../graphql/mutations";
import { SendRounded } from "@material-ui/icons";
import { ClipLoader } from "react-spinners";

const NewMessage = () => {
  const [message, setMessage] = useState("");
  const { chatId } = useParams();
  const [createMessage, { loading, error }] = useMutation(CREATE_MESSAGE, {
    variables: { message, chatId },
    onError: error => console.log(error),
    onCompleted: data => setMessage("")
  });
  const onMessageChange = event => {
    setMessage(event.target.value);
  };
  const onSendMessage = event => {
    event.preventDefault();
    createMessage();
  };

  return (
    <form
      className="flexr j-between a-center top-border"
      onSubmit={onSendMessage}
    >
      <input
        className="message-input m-v-1 p-h-3"
        placeholder="New message..."
        type="text"
        value={message}
        onChange={onMessageChange}
        autoFocus
      />
      <button className="btn-no-style p-h-3" type="submit" disabled={!message}>
        {loading ? (
          <ClipLoader size={32} color="#3f01bc" />
        ) : (
          <SendRounded style={{ fontSize: 32, color: "#3f01bc" }} />
        )}
      </button>
    </form>
  );
};

export default NewMessage;
