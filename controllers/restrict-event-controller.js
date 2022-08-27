/**
 * @Imports
 */
const { getEventURIService } = require("../services/uri-event-service.js");

/**
 * @brief Wrapper which calls GET /event/[eventURI]/[accessToken].
 *        Returns information in response body for
 *        specified event.
 * 
 * @param res Response to return to client
 * @param uri URI of the specified event to fetch
 * @param next Call to execute next middleware.
 * @require res, uri, next != null. uri is
 *          well-formatted
 * @ensure Success: 200 OK, 
 *         Fail: 500 ERROR.
 */
const getEventURI = async (res, uri, next) => {
  try {
    const eventInfo = await getEventURIService(uri);
    await res.json(eventInfo);
    next();
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
}

module.exports = { getEventURI } 