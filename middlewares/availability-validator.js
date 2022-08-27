/**
 * @Imports
 */
const { validateTimesArray } = require("../middlewares/event-validator.js");

/**
 * @brief Given an object, validates whether
 *        it is a well-formatted availability 
 *        object (see types/general.js)
 * 
 * @param availObj Object to validate as
 *                 availabilityObj
 * @return boolean - true/false
 * 
 * @require availObj != null
 * @ensure Returns true iff availObj is valid,
 *         well-formatted. Raises error otherwise
 */
const availValidator = async (availObj) => {
  // Ensure availObj not null/undefined
  if (availObj == null) {
    throw new Error("Invalid availability.");
  }
  // Check for existence of username, times array
  if (availObj["username"] == null || availObj["times"] == null) {
    throw new Error("Invalid availability.");
  }

  // Ensure all timeRange objects in times array are valid
  return validateTimesArray(availObj["times"]);
}

module.exports = { availValidator }