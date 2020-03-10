const Chat = require("../../models/chat");

module.exports = {
  createChat: async (args, req) => {
    try {
      if (!req.isAuthenticated) {
        throw new Error("Unauthenticated request.");
      }
      const existingChat = await Chat.findOne({
        name: args.chatInput.name
      });
      if (existingChat) {
        throw new Error("A chat with this name already exists.");
      }

      const chat = new Chat({
        name: args.chatInput.name,
        description: args.chatInput.description,
        timestamp: new Date(),
        createdBy: req.userId
      });

      const result = await chat.save();
      return result;
    } catch (err) {
      throw err;
    }
  }
};
