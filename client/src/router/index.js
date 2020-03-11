// Written by Andrew Perera
// Copyright 2020

import React from "react";
import { connect } from "react-redux";
import { Router as DOMRouter, Route, Switch, Redirect } from "react-router-dom";
import history from "../history";
import CreateUser from "../pages/CreateUser";

const Router = props => {
  const { token } = props;
  return (
    <DOMRouter history={history}>
      <Switch>
        {token && <Redirect from="/" to="chat" />}
        <Route path="/" exact component={CreateUser} />
        <Route path="/chat" render={() => null} />
      </Switch>
    </DOMRouter>
  );
};

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

export default connect(mapStateToProps)(Router);
