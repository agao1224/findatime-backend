/**
 * @Imports
 */
const express = require("express");
const { check, body, validationResult } = require("express-validator");

const { postEvent } = require("../controllers/event-controller.js");
const { validateDays } = require("../middlewares/event-validator.js");

const eventRouter = express.Router();
const restrictEventRouter = require("./restrict-event-routes.js");

/**
 * @Route POST /event
 * 
 * @brief Creates an new event in the database.
 *        Generates unique URL to new event
 */
eventRouter.post("/",
  check("days").exists().isArray(),
  check("startTime").exists().isNumeric(),
  check("endTime").exists().isNumeric(),
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
 * @Route GET, POST /event/[event URI]/[access token]
 * 
 * @brief Restricted router endpoints requiring access token
 */
eventRouter.use("/:eventURI", restrictEventRouter);

module.exports = { eventRouter }