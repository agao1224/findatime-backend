/**
 * @brief Imports 
 */
const { createEventService } = require("../services/create-event-service.js");
const { getEventURIService } = require("../services/uri-event-service.js");
const { postLoginEventService } = require("../services/post-login-event-service.js");
const { createNewUserService } = require("../services/create-new-user-service.js");

/**
 * @brief Wrapper which calls POST /event to
 *        create new meeting scheduling event.
 *        Response contains URL to newly created event
 * 
 * @param req POST request to /event
 * @param res Response to return to client.
 * @param next Call to execute next middleware.
 * @require req, res, next != null.
 * @ensure Success: 201 CREATED, 
 *         Fail: 500 ERROR.
 */
const postEvent = async (req, res, next) => {
  try {  
    const eventURL = await createEventService(req.body);
    await res.status(201).json({ uri: eventURL });
    next();
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
}

/**
 * @brief Wrapper which calls GET /event/[:eventURI].
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

/**
 * @brief Wrapper which calls GET /event/[:eventURI].
 *        Logs the user in or creates new "account" for
 *        them on the specified event 
 * 
 * @param req POST request to /event/[:eventURI]
 * @param res Response to return to client.
 * @param next Call to execute next middleware.
 * @require req, res, next != null.
 * @ensure Success: 200 OK, 
 *         Fail: 500 ERROR.
 */
const postLoginEvent = async (req, res, next) => {
  try {
    // Can either be returning user or new user 
    const isReturningUser = await postLoginEventService(req.body, req.params.eventURI);
    if (isReturningUser) {
      // Return 
    } else {
      // User is new
      await createNewUser
    }
    await res.sendStatus(200);
    next();
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
}
 
module.exports = {
  postEvent, getEventURI, postLoginEvent
}