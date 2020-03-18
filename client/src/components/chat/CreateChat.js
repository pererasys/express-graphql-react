/*

Written by Andrew Perera
Copyright 2020

*/

import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_CHAT } from "../../graphql/mutations";
import { ClipLoader } from "react-spinners";
import "./CreateChat.css";

const CreateChat = props => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [createChat, { loading, error }] = useMutation(CREATE_CHAT, {
    variables: { name, description },
    onError: error => console.log(error),
    onCompleted: data => {
      props.history.push("/chat");
    }
  });

  const onNameChange = event => {
    setName(event.target.value);
  };
  const onDescriptionChange = event => {
    setDescription(event.target.value);
  };

  const onCreateChat = event => {
    event.preventDefault();
    createChat();
  };

  return (
    <div className="flexc full center alt-background">
      <div className="flexc full-border new-chat-content rounded p-3">
        <h2 className="upper-case text-center">New Chat</h2>
        <p className="body-text-2 m-v-1">
          Anybody who visits this site will be allowed to post in this chat.
        </p>
        <form className="new-chat-form" onSubmit={onCreateChat}>
          {error &&
            error.graphQLErrors.map(({ message }, index) => (
              <span className="error-text" key={index}>
                {message}
              </span>
            ))}
          <div className="flexc">
            <input
              className="field-input text-center"
              placeholder="Name"
              type="text"
              value={name}
              onChange={onNameChange}
            />
          </div>
          <div className="flexc m-v-1">
            <input
              className="field-input text-center"
              placeholder="Description - Optional"
              type="text"
              value={description}
              onChange={onDescriptionChange}
            />
          </div>

          <button className="btn btn-primary" type="submit" disabled={!name}>
            {loading ? <ClipLoader size={18} color="#ffffff" /> : "go"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateChat;
