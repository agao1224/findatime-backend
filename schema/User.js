/**
 * @Imports
 */
const mongoose = require("mongoose");
const { user } = require("./types/general");


const userSchema = new mongoose.Schema(user)

module.exports = mongoose.model("User", userSchema);