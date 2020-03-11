// Written by Andrew Perera
// Copyright 2020

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import AuthReducer from "./AuthReducer";

const authPersistConfig = {
  key: "auth",
  storage: storage
};

export const reducers = {
  auth: persistReducer(authPersistConfig, AuthReducer)
};
