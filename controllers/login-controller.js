/**
 * @Imports
 */
const { postLoginEventService } = require("../services/post-login-event-service.js");
const { createNewUserService } = require("../services/create-new-user-service.js");
const { getEventAccessToken } = require("../services/get-access-token-service.js");

/**
 * @brief Wrapper which calls POST /event/[:eventURI].
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
    const accessTokenJSON = { accessToken: null }
    const isReturningUser = await postLoginEventService(req.body, req.params.eventURI);
    let eventAccessToken = null;
    if (isReturningUser) {
      // Just return access token 
      eventAccessToken = await getEventAccessToken(req.params.eventURI);
    } else {
      // User is new, create new entry for event URI
      // and return access token 
      eventAccessToken = 
        await createNewUserService(req.params.eventURI, req.body);
    }
    accessTokenJSON["accessToken"] = eventAccessToken;
    await res.json(accessTokenJSON);
    next();
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
}

module.exports = { postLoginEvent }