/**
 * @Imports
 */
const express = require("express");
const ObjectId = require("mongoose").Types.ObjectId;
const { param, validationResult } = require("express-validator");
 
const { getEventURI } = require("../controllers/restrict-event-controller.js");
const { accessTokenValidator } = require("../middlewares/access-token-validator.js");

const restrictEventRouter = express.Router({mergeParams: true});

/**
 * @Route GET /event/[event URI]/[access token]
 * 
 * @brief Fetches information regarding a 
 *        specific event
 */
restrictEventRouter.get("/:accessToken",
  param("eventURI").custom(uri => {
    if (ObjectId.isValid(uri)) {
      return true;
    } else {
      throw new Error("Invalid event or access token.");
    }
  }),
  param("accessToken").custom(async (accessToken, { req }) => {
    const isValidToken = 
      await accessTokenValidator(req.params.eventURI, accessToken);
    if (isValidToken) {
      return true;
    } else {
      throw new Error("Invalid event or access token.");
    }
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

module.exports = restrictEventRouter;