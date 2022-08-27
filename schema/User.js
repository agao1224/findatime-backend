/**
 * @Imports
 */
const mongoose = require("mongoose");
const { user } = require("./types/general.js");


const userSchema = new mongoose.Schema(user)

module.exports = mongoose.model("User", userSchema);