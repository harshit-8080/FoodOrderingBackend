const helper = () => {
  const num = Math.floor(Math.random() * 10);

  return num % 2 == 0;
};

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
