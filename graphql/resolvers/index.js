const authResolver = require("./auth");
const chatsResolver = require("./chats");

const rootResolver = {
  ...authResolver,
  ...chatsResolver,
  ...bookingResolver
};

module.exports = rootResolver;
