const jwt = require("jsonwebtoken");

const User = require("../../models/user");

module.exports = {
  createUser: async args => {
    try {
      const existingUser = await User.findOne({
        username: args.userInput.username
      });
      if (existingUser) {
        throw new Error("This username is taken.");
      }

      const user = new User({
        username: args.userInput.username
      });

      const result = await user.save();

      const token = jwt.sign({ userId: user.id }, "somesupersecretkey", {
        expiresIn: "7 days"
      });
      return {
        _id: result._id,
        username: result.username,
        token: token,
        tokenExpiration: 7
      };
    } catch (err) {
      throw err;
    }
  }
};
