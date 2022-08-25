/**
 * @Imports
 */
const Event = require("../schema/Event.js");

/**
 * @brief Wrapper function to query database
 *        using schema. 
 * 
 * @param uri URI to identify specific event document
 * @return JSON or null
 * 
 * @require URI is valid and well-formatted
 * @ensure JSON returned if document found,
 *         null if document doesn't exist
 */
const findEvent = async (uri) => {
  try {
    const event = await Event.findById(uri);
    return event;
  } catch (e) {
    throw new Error("Failed to query database for specified event.");
  }
}

/**
 * @brief Given uri of document, attempt to find
 *        document with matching object ID. Will
 *        return null if no such event found.
 * 
 * @param uri URI to identify specific event document
 * @return JSON or null
 * 
 * @require URI is valid and well-formatted
 * @ensure JSON returned if document found,
 *         null if document doesn't exist
 */
const getEventURIService = async (uri) => {
  try {
    const event = await findEvent(uri);
    if (event != null) {
      return event;
    } else {
      return null;
    }
  } catch (e) {
    throw new Error(e.message);
  }
}

module.exports = { getEventURIService }