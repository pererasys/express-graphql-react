// Written by Andrew Perera
// Copyright 2020

import {} from "../actions/types";

const INITIAL_STATE = {
  username: null,
  token: null,
  tokenExpiry: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
