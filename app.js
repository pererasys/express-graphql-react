const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require("./middleware/authentication");
const schema = require("./graphql/schema/index");
const resolvers = require("./graphql/resolvers/index");

const context = async ({ req, connection }) => {
  if (connection) {
    return { connection };
  }
  return { req };
};

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use(auth);

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context,
  playground: true,
  introspection: true
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen(3001);

mongoose.connect("mongodb://localhost/test-db", { useNewUrlParser: true });
