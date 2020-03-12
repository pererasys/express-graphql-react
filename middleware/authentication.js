const jwt = require("jsonwebtoken");

module.exports = ({ req }) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuthenticated = false;
    return req;
  }
  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    req.isAuthenticated = false;
    return req;
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_KEY);
  } catch (err) {
    req.isAuthenticated = false;
    return req;
  }
  if (!decodedToken) {
    req.isAuthenticated = false;
    return req;
  }
  req.isAuthenticated = true;
  req.userId = decodedToken.userId;
  return req;
};
