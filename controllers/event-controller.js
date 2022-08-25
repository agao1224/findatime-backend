/**
 * @brief Imports 
 */
const { createEventService } = require("../services/create-event-service.js");

/**
 * @brief Wrapper which calls POST /event to
 *        create new meeting scheduling event.
 *        Response contains URL to newly created event
 * 
 * @param req POST request to /event
 * @param res Response to return to client.
 * @param next Call to execute next middleware.
 * @require req, res, next != null.
 * @ensure Success: 201 OK, 
 *         Fail: 500 ERROR.
 */
const postEvent = async (req, res, next) => {
  try {  
    const eventURL = await createEventService(req.body);
    res.status(201).json({ url: eventURL });
    next();
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
}
 
module.exports = {
  postEvent 
}