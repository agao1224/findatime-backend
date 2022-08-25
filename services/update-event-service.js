/**
 * @Imports
 */
const Event = require("../schema/Event.js");


/**
 * @brief Given an event uri, attempts to query
 *        database to find specified event document.
 *        Then returns its list of available times.
 * 
 * @param uri URI to specify event document
 * @return availableTimes array
 * 
 * @require valid, well-formatted uri
 * @ensure valid, well-formatted availableTimes array
 *         is returned
 */
const findEventAvail = async (uri) => {
  try {
    const eventDoc = await Event.findById(uri);
    return eventDoc["availableTimes"];
  } catch (e) {
    throw new Error("ERROR: Unable to fetch event document",
                    "specified by uri");
  }
}

/**
 * @brief Given a well-formed availability object,
 *        updates the specified event object with
 *        it in the database.
 * 
 * @param availObj Availability object to update
 *                 event object with
 * @param uri URI of event object to update
 * 
 * @require availObj, uri are both valid and non-null
 */
const addAvailToEvent = async (availObj, uri) => {
  try {
    // Get event's previous availabilities
    const oldEventAvail = findEventAvail(uri);

    /**
     * @IMPORTANT Must check if user has already 
     *            entered in their availability before
     */
    
    const idFilter = { _id: uri }

    const updatedEventDoc = 
      await Event.findOneAndUpdate(idFilter, )
  } catch (e) {
    throw new Error("ERROR: Unable to update event object.");
  }
}

/**
 * @brief Given a well-formed availability object,
 *        updates the specified event object with
 *        it in the database.
 * 
 * @param availObj Availability object to update
 *                 event object with
 * @param uri URI of event object to update
 * 
 * @require availObj, uri are both valid and non-null
 */
const updateEventService = async (availObj, uri) => {
  try {
    
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = { updateEventService }