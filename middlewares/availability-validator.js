/**
 * @Imports
 */
const { validateTimesArray } = require("./event-validator.js");
const { validateUserAvail } = require("./user-availability-validator.js");

/**
 * @brief Given an object, validates whether
 *        it is a well-formatted availability 
 *        object (see types/general.js)
 * 
 * @param uri Specifies the event 
 * @param availObj Object to validate as
 *                 availabilityObj
 * @return boolean - true/false
 * 
 * @require availObj != null
 * @ensure Returns true iff availObj is valid,
 *         well-formatted. Raises error otherwise
 */
const availValidator = async (uri, availObj) => {
  // Ensure availObj not null/undefined
  if (availObj == null) {
    throw new Error("Invalid availability.");
  }
  // Check for existence of username, times array
  if (availObj["username"] == null || availObj["times"] == null) {
    throw new Error("Invalid availability.");
  }

  const times = availObj["times"];
  // Ensure all timeRange objects in times array are valid
  // and that timeRange objects fall within event's bounds
  return (validateTimesArray(times)
          && await validateUserAvail(uri, times));
}

module.exports = { availValidator }