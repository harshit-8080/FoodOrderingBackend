const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../configs/sever.config");

exports.createToken = (email) => {
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "2d" });

  return token;
};

exports.verifyToken = (token) => {
  const decode = jwt.verify(token, JWT_SECRET);

  return decode;
};
