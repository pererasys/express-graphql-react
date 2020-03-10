const Message = require("../../models/message");

module.exports = {
  createMessage: async (args, req) => {
    try {
      if (!req.isAuthenticated) {
        throw new Error("Unauthenticated request.");
      }

      const message = new Message({
        message: args.messageInput.message,
        timestamp: new Date(),
        chat: args.messageInput.chatId,
        createdBy: req.userId
      });

      const result = await message.save();
      return result;
    } catch (err) {
      throw err;
    }
  }
};
