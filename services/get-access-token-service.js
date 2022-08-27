/**
 * @brief Imports
 */
const Event = require("../schema/Event.js");

/**
 * @brief Given event URI, fetches the access
 *        token specific to that event.
 * 
 * @param uri Specifies event to find
 *            access token for
 * @return access token, or null if it doesn't exist
 * 
 * @require uri != null and valid in database
 * @ensure Access token corresponding to event uri
 *         returned 
 */
const getEventAccessToken = async (uri) => {
  try {
    const eventDoc = await Event.findById(uri);
    if (eventDoc == null) {
      throw new Error("Invalid event URI");
    } else {
      return eventDoc["accessToken"];
    }
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = { getEventAccessToken }
