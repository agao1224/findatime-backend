/**
 * @Imports
 */
const express = require("express");
const ObjectId = require('mongoose').Types.ObjectId;
const { check, body, param, validationResult } = require("express-validator");

const { postEvent, getEventURI, postLoginEvent } = require("../controllers/event-controller.js");
const { validateDays } = require("../middlewares/event-validator.js");

const eventRouter = express.Router();

/**
 * @Route POST /event
 * 
 * @brief Creates an new event in the database.
 *        Generates unique URL to new event
 */
eventRouter.post("/",
  check("days").exists().isArray(),
  check("startTime").exists().isISO8601(),
  check("endTime").exists().isISO8601(),
  body("days").custom(dayArray => validateDays(dayArray)),
  body("startTime").custom((startTime, { req }) => {
    if (req.body.endTime < startTime) {
      throw new Error("End time must be after start time.");
    }
    return true;
  }),
  async (req, res, next) => {
    const errors = validationResult(req);
    const hasErrors = !errors.isEmpty();
    if (hasErrors) {
      console.log(errors);
      res.sendStatus(500);
    } else {
      await postEvent(req, res, next);
    }
    next();
  }
);

/**
 * @Route GET /event/[event URI]
 * 
 * @brief Fetches information regarding a 
 *        specific event
 */
eventRouter.get("/:eventURI",
  param("eventURI").custom(uri => {
    if (ObjectId.isValid(uri)) {
      return true;
    } else {
      throw new Error("Invalid URI.");
    }
  }),
  async (req, res, next) => {
    const errors = validationResult(req);
    const hasErrors = !errors.isEmpty();
    if (hasErrors) {
      console.log(errors);
      res.sendStatus(500);
    } else {
      await getEventURI(res, req.params.eventURI, next);
    }
    next();
  }
);

/**
 * @Route POST /event/[event URI]/login
 * 
 * @brief Fetches information regarding a 
 *        specific event
 */
eventRouter.post("/:eventURI/login",
  check("username").exists().isAlphanumeric(),
  check("password").exists().isAlphanumeric(),
  async (req, res, next) => {
    const errors = validationResult(req);
    const hasErrors = !errors.isEmpty();
    if (hasErrors) {
      console.log(errors);
      res.sendStatus(500);
    } else {
      await postLoginEvent(req, res, next);
    }
    next();
  }
);


module.exports = { eventRouter }