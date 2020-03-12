/*

Written by Andrew Perera
Copyright 2020

*/

const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { createServer } = require("http");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { makeExecutableSchema } = require("graphql-tools");
const { execute, subscribe } = require("graphql");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const authenticate = require("./middleware/authentication");
const schema = require("./graphql/schema/index");
const resolvers = require("./graphql/resolvers/index");

const app = express();

app.use(bodyParser.json());

app.use(cors());

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
    const request = authenticate({ req });
    return { req: request };
  },
  playground: true,
  introspection: true,
  uploads: false
});

server.applyMiddleware({ app, path: "/graphql" });

const subscriptionServer = createServer(app);

const subSchema = makeExecutableSchema({ typeDefs: schema, resolvers });

subscriptionServer.listen(3001, () => {
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema: subSchema
    },
    {
      server: subscriptionServer,
      path: "/subscriptions"
    }
  );
});

mongoose.connect("mongodb://localhost/test-db", { useNewUrlParser: true });
