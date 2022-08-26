const reqInt = {
  type: Number,
  required: true
};

const reqStr = {
  type: String,
  required: true
};

const user = {
  username: reqStr,
  password: reqStr
};

module.exports = { reqInt, reqStr, user };
