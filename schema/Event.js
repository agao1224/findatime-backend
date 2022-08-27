/**
 * @Imports
 */
const mongoose = require("mongoose");
const { reqStr, reqInt, user, availabilityObj } = require("./types/general.js");

const eventSchema = new mongoose.Schema({
  days: [reqStr],
  accessToken: reqStr, 
  startTime: reqInt,
  endTime: reqInt, 
  users: [user],
  availableTimes: [availabilityObj]
});

module.exports = mongoose.model("Event", eventSchema);
