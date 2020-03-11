// Written by Andrew Perera
// Copyright 2019

import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import "./CreateUser.css";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const onUsernameChange = event => {
    setUsername(event.target.value);
  };
  const onCreateUser = event => {
    event.preventDefault();
    setLoading(true);
    console.log(username);
  };
  return (
    <div className="flexc full-screen center alt-background">
      <div className="flexc full-border new-user-content rounded p-3">
        <h5 className="upper-case">new user</h5>
        <p className="body-text-2">
          Just a simple chat app built with NodeJS, GraphQL, and React.
        </p>
        <form className="new-user-form" onSubmit={onCreateUser}>
          <input
            className="field-input text-center m-v-3"
            placeholder="Username"
            type="text"
            value={username}
            onChange={onUsernameChange}
          />
          <button className="btn btn-primary m-v-3" type="submit">
            {loading ? <ClipLoader size={18} color="#ffffff" /> : "go"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
