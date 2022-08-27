/**
 * @Imports
 */
const ObjectId = require("mongoose").Types.ObjectId;

/**
 * @brief Validates that given URI is
 *        in Mongo ObjectID format.
 * 
 * @param uri 
 * @return boolean - true/false
 *
 * @ensure Returns true iff URI is in valid
 *         Mongo ObjectID format. Raises
 *         error otherwise
 */
const uriValidator = async (uri) => {
  if (await ObjectId.isValid(uri)) {
    return true;
  } else {
    throw new Error("Invalid event or access token.");
  }
}

module.exports = { uriValidator }