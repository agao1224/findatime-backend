/**
 * @Imports
 */
const Event = require("../schema/Event.js");
const { getEventURIService } = require("./uri-event-service.js");

/**
 * @brief Given document URI, queries database
 *        for specified document and checks
 *        whether username already exists in
 *        availabilityObj. 
 * 
 * @param uri Specifies event to search for
 * @param username 
 * @return boolean - true/false
 * 
 * @require uri != null, valid in database
 * @ensure Returns true iff username already
 *         has availability on event document
 */
const findOldAvailability = async (uri, username) => {
  try {
    const eventDoc = await getEventURIService(uri);
    const availArray = eventDoc["availableTimes"];

    for (let i = 0; i < availArray.length; i++) {
      const currAvailObj = availArray[i];
      if (currAvailObj["username"] === username) {
        return true;
      }
    }
    return false;
  } catch (e) {
    throw new Error("ERROR: Failed to query event for username.");
  }
}

/**
 * @brief Given uri and username, deletes
 *        old availability entry in event
 * 
 * @param uri Specifies the event document
 * @param username 
 * 
 * @require uri, username != null, uri is valid,
 *          and username exists in uri
 * @ensure Deletes user's old availability object
 *         from event specifies by uri
 */
const deleteOldAvailability = async (uri, username) => {
  try {
    const eventQuery = { _id: uri };
    // Delete availabilityObj from event's availableTimes
    // array that matches client's username field 
    const deleteAvailOperation = { $pull: { availableTimes: { username: username }}};

    await Event.findOneAndUpdate(
      eventQuery,
      deleteAvailOperation
    );
  } catch (e) {
    console.log(e.message);
    throw new Error("ERROR: Could not delete user's old availability.");
  }
}

/**
 * @brief Given event URI, username, availabilityObj,
 *        adds user's availability to event
 *        document in the database
 * 
 * @param uri Specifies event
 * @param username 
 * @param availObj User's available times
 * 
 * @require uri, username, availObj != null,
 *          uri specifies valid event document,
 *          availObj is well-formatted and doesn't
 *          yet exist in event document
 * @ensure Adds new availability to event's
 *         document 
 */
const addAvailability = async (uri, username, availObj) => {
  try {
    const eventQuery = { _id: uri };
    const appendAvailOperation = { $push: { availableTimes: availObj }};

    await Event.findOneAndUpdate(
      eventQuery,
      appendAvailOperation 
    );
  } catch (e) {
    console.log(e.message);
    throw new Error("ERROR: Could not add user's availability.");
  }
}

/**
 * @brief Given event and request body, either
 *        adds or updates user's availability
 *        in event object 
 * 
 * @param uri Specifies event document to modify
 * @param body Request body
 * 
 * @require uri, body != null and body has valid
 *          username, availabilityObj
 * @ensure Adds/updates user's availability in
 *         event 
 */
const updateEventService = async (uri, body) => {
  try {
    // Check if user's availability already exists
    // in event document
    const username = body.availabilityObj.username;
    const hasOldAvailability = await findOldAvailability(uri, username);
    // If so, delete it 
    if (hasOldAvailability) {
      await deleteOldAvailability(uri, username);
    }
    // Add new availability
    await addAvailability(uri, username, body.availabilityObj);
  } catch (e) {
    console.log(e.message);
    throw new Error("ERROR: Unable to update availability.");
  }
}


module.exports = { updateEventService }