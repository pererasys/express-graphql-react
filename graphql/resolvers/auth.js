// Written by Andrew Perera
// Copyright 2020

const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const { UserInputError } = require("apollo-server-express");

module.exports = {
  Mutation: {
    createUser: async (root, args, context) => {
      try {
        const { username } = args.userInput;

        const existingUser = await User.findOne({ username });

        if (existingUser) {
          throw new UserInputError("This username is taken.");
        }

        const user = new User({
          username
        });

        const result = await user.save();

        const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY, {
          expiresIn: "7 days"
        });

        return {
          userId: result._id,
          username: result.username,
          token: token,
          tokenExpiration: 7
        };
      } catch (err) {
        throw err;
      }
    }
  }
};
