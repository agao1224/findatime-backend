/**
 * @Imports
 */





const createEventDoc = async (body) => {
  
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

  } catch (e) {
    console.log(e.message);
  }
}

module.exports = {
  createEventService 
}