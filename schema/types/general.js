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

const timeRange = {
  day: reqStr,
  start: reqStr,
  end: reqStr 
};

const availabilityObj = {
  username: reqStr,
  times: [timeRange]
};

module.exports = { reqInt, reqStr, user, availabilityObj };
