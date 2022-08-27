/**
 * @Imports
 */
const mongoose = require("mongoose");
const { reqStr, user, availabilityObj } = require("./types/general.js");

const reqDate = {
  type: Date,
  required: true
};

const eventSchema = new mongoose.Schema({
  days: [reqStr],
  accessToken: reqStr, 
  startTime: reqDate,
  endTime: reqDate, 
  users: [user],
  availableTimes: [availabilityObj]
});

module.exports = mongoose.model("Event", eventSchema);
