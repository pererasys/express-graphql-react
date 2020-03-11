/*

Written by Andrew Perera
Copyright 2020

*/

import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_USER } from "../graphql/mutations";
import { ClipLoader } from "react-spinners";
import "./CreateUser.css";
import { Redirect } from "react-router-dom";

const CreateUser = props => {
  const [username, setUsername] = useState("");
  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    variables: { username },
    onError: error => console.log(error),
    onCompleted: data => {
      localStorage.setItem("userId", data.createUser.userId);
      localStorage.setItem("username", data.createUser.username);
      localStorage.setItem("token", data.createUser.token);
    }
  });

  const onUsernameChange = event => {
    setUsername(event.target.value);
  };
  const onCreateUser = event => {
    event.preventDefault();
    createUser();
  };

  const token = localStorage.getItem("token");
  if (token) return <Redirect from="/" to="/chat" />;
  return (
    <div className="flexc full center alt-background">
      <div className="flexc full-border new-user-content rounded p-3">
        <h2 className="upper-case text-center">choose a username</h2>
        <p className="body-text-2">
          Just a simple chat app built with NodeJS, GraphQL, and React.
        </p>
        <form className="new-user-form" onSubmit={onCreateUser}>
          <div className="flexc m-v-3">
            <input
              className="field-input text-center"
              placeholder="Username"
              type="text"
              value={username}
              onChange={onUsernameChange}
            />
            {error &&
              error.graphQLErrors.map(({ message }, index) => (
                <span className="error-text" key={index}>
                  {message}
                </span>
              ))}
          </div>

          <button
            className="btn btn-primary m-v-3"
            type="submit"
            disabled={!username}
          >
            {loading ? <ClipLoader size={18} color="#ffffff" /> : "go"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
