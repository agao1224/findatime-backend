/**
 * @Imports
 */
const { getEventURIService } = require("../services/uri-event-service.js");
const { updateEventService } = require("../services/update-event-service.js");

/**
 * @brief Wrapper which calls GET /event/[eventURI]/[accessToken].
 *        Returns information in response body for
 *        specified event.
 * 
 * @param res Response to return to client
 * @param uri URI of the specified event to fetch
 * @param next Call to execute next middleware.
 * 
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

/**
 * @brief Wrapper which calls POST /event/[eventURI]/[accessToken].
 *        Given request body with availability object,
 *        updates/creates new availability entry in 
 *        specified event
 * 
 * @param req Request body sent by client 
 * @param res Response to return to client
 * @param next Call to execute next middleware
 * 
 * @require req, res, next != null
 * @ensure Success: 201 CREATED,
 *         Fail: 500 ERROR
 */
const updateEventURI = async (req, res, next) => {
  try {
    await updateEventService(req.params.eventURI, req.body);
    res.sendStatus(201);
    next();
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
}

module.exports = { getEventURI, updateEventURI } 