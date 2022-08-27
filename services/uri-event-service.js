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
 * @brief Given event document from database,
 *        crafts event JSON response. Makes sure
 *        to not include other users' information
 * 
 * @param eventDoc Document from database containing
 *                 event information
 * @return JSON object containing only necessary
 *         event information for user
 * 
 * @require eventDoc != null and is well-formatted event
 *          document
 * @ensure JSON document containing only strictly what
 *         is necessary for user is returned
 */
const craftEventResponse = (eventDoc) => {
  const eventResponse = {
    days: eventDoc["days"],
    startTime: eventDoc["startTime"],
    endTime: eventDoc["endTime"],
    availableTimes: eventDoc["availableTimes"]
  }
  return eventResponse;
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
      const response = await craftEventResponse(event);
      return response;
    } else {
      return null;
    }
  } catch (e) {
    throw new Error(e.message);
  }
}

module.exports = { getEventURIService }