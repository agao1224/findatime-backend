/**
 * @Imports
 */
const mongoose = require("mongoose");
const { reqStr } = require("./types/general.js");

const reqDate = {
  type: Date,
  required: true
};

const eventSchema = new mongoose.Schema({
  days: [reqStr],
  startTime: reqDate,
  endTime: reqDate, 
});

module.exports = mongoose.model("Event", eventSchema);
