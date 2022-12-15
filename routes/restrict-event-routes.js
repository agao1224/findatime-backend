/**
 * @Imports
 */
const express = require("express");
const { param, check, validationResult } = require("express-validator");
 
const { getEventURI, updateEventURI } = require("../controllers/restrict-event-controller.js");

const { accessTokenValidator } = require("../middlewares/access-token-validator.js");
const { uriValidator } = require("../middlewares/uri-validator.js");
const { availValidator } = require("../middlewares/availability-validator.js");

const restrictEventRouter = express.Router({mergeParams: true});


/**
 * @Route GET /event/[event URI]/[access token]
 * 
 * @brief Fetches information regarding a 
 *        specific event. If either/both event URI
 *        and access token are invalid, gives a 
 *        403 FORBIDDEN response.
 */
restrictEventRouter.get("/:accessToken",
  param("eventURI").custom(async (uri) => {
    return await uriValidator(uri);
  }),
  param("accessToken").custom(async (accessToken, { req }) => {
    console.log('faggot3')
    return await accessTokenValidator(req.params.eventURI, accessToken);
  }),
  async (req, res, next) => {
    const errors = validationResult(req);
    const hasErrors = !errors.isEmpty();
    if (hasErrors) {
      // Forbidden, user does not have valid credentials
      res.sendStatus(403); 
    } else {
      await getEventURI(res, req.params.eventURI, next);
    }
    next();
  }
);


/**
 * @Route POST /event/[event URI]
 * 
 * @brief Given valid access token for event,
 *        adds a new availability object onto event
 *        for specified user
 */
restrictEventRouter.post("/",
  param("eventURI").custom(async (uri) => {
    return await uriValidator(uri);
  }),
  check("accessToken").exists(),
  check("accessToken").custom(async (accessToken, { req }) => {
    console.log('faggot2')
    return await accessTokenValidator(req.params.eventURI, accessToken);
  }),
  check("availabilityObj").exists(),
  check("availabilityObj").custom(async (availObj, { req }) => {
    return await availValidator(req.params.eventURI, availObj);
  }),  
  async (req, res, next) => {
    const errors = validationResult(req);
    const hasErrors = !errors.isEmpty();
    if (hasErrors) {
      res.sendStatus(403);
    } else {
      await updateEventURI(req, res, next);
    }
    next();
  }
)

module.exports = restrictEventRouter;