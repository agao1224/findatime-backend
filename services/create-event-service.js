/**
 * @Imports
 */
const Event = require("../schema/Event.js");


/**
 * @brief Creates a new event document given 
 *        request body using Event schema
 * 
 * @param body Request body with valid
 *             event information
 * 
 * @require body contains valid days,
 *          startTime, endTime
 * @ensure Valid event document is created
 *         and returned
 */
const createEventDoc = async (body) => {
  const newEventDoc = new Event({
    days: body.days,
    startTime: body.startTime,
    endTime: body.endTime 
  });
  return newEventDoc;
}

/**
 * @brief Creates a new event schema and writes
 *        it to the database. Returns URL in response
 *        upon success. 
 * 
 * @param body Request body 
 * 
 * @require Request body contains scheduling days,
 *          start time, and end time
 * @ensure Creates and writes the event to database.
 *         Returns URL in response if successful.
 */
const createEventService = async (body) => {
  try {
    const eventDoc = await createEventDoc(body);
    
    await eventDoc.save((err, savedEventDoc) => {
      if (!err) {
        console.log("Success. Event document saved.");
        return savedEventDoc._id;
      } else {
        throw new Error("ERROR: Unable to save event document.");
      }
    });
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = {
  createEventService 
}