/**
 * @Imports
 */
const mongoose = require("mongoose");
const { reqStr, user } = require("./types/general.js");

const reqDate = {
  type: Date,
  required: true
};

const timeRange = {
  day: reqStr,
  start: reqStr,
  end: reqStr 
}

const availabilityObj = {
  username: reqStr,
  times: [timeRange]
}

const eventSchema = new mongoose.Schema({
  days: [reqStr],
  accessToken: reqStr, 
  startTime: reqDate,
  endTime: reqDate, 
  users: [user],
  availableTimes: [availabilityObj]
});

module.exports = mongoose.model("Event", eventSchema);
