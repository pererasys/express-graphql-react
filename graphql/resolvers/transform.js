const DataLoader = require("dataloader");

const User = require("../../models/user");
const { dateToString } = require("../../utils/date");

const userLoader = new DataLoader(userIds => {
  return User.find({ _id: { $in: userIds } });
});

const user = async userId => {
  try {
    const user = await userLoader.load(userId.toString());
    return {
      ...user._doc,
      _id: user.id
    };
  } catch (err) {
    throw err;
  }
};

const transformChat = chat => {
  return {
    ...chat._doc,
    _id: chat.id,
    createdAt: dateToString(chat.createdAt),
    createdBy: user.bind(this, chat.createdBy)
  };
};

exports.transformChat = transformChat;
