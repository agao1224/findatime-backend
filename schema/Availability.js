/**
 * @Imports
 */
const mongoose = require("mongoose");
const { availabilityObj } = require("./types/general.js");


const availSchema = new mongoose.Schema(availabilityObj);

module.exports = mongoose.model("Availability", availSchema);