/*

Written by Andrew Perera
Copyright 2020

*/

const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { createServer } = require("http");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { execute, subscribe } = require("graphql");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require("./middleware/authentication");
const schema = require("./graphql/schema/index");
const resolvers = require("./graphql/resolvers/index");

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use(auth);

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  subscriptions: {
    onConnect: (connectionParams, webSocket) => {
      return;
    }
  },
  context: async ({ req, connection }) => {
    if (connection) {
      return { req, connection };
    }
    return { req };
  },
  playground: true,
  introspection: true
});

server.applyMiddleware({ app, path: "/graphql" });

const subscriptionServer = createServer(app);

subscriptionServer.listen(3001, () => {
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema
    },
    {
      server: subscriptionServer,
      path: "/subscriptions"
    }
  );
});

mongoose.connect("mongodb://localhost/test-db", { useNewUrlParser: true });
