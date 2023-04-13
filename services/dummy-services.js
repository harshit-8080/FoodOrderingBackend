const { helper } = require("./helper");

const execute = () => {
  const result = helper();

  if (result) {
    return "NODE";
  } else {
    return "REACT";
  }
};

module.exports = {
  helper,
  execute,
};
