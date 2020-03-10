const authResolver = require("./auth");
const chatsResolver = require("./chats");
const messagesResolver = require("./messages");

const rootResolver = {
  ...authResolver,
  ...chatsResolver,
  ...messagesResolver
};

module.exports = rootResolver;
