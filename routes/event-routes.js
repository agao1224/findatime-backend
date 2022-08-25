/**
 * @Imports
 */
const express = require("express");
const { check, validationResult } = require("express-validator");

const { postEvent } = require("../controllers/event-controller");

const eventRouter = express.Router();

/**
 * @Route POST /event
 * 
 * @brief Creates an new event in the database.
 *        Generates unique URL to new event
 */
eventRouter.post("/",
  check("days").exists().isArray(),
  check("startTime").exists().isDate(),
  check("endTime").exists().isDate(),
  async (req, res, next) => {
    const errors = validationResult(req);
    const hasErrors = !errors.isEmpty();
    if (hasErrors) {
      res.sendStatus(500);
    } else {
      await postEvent(req);
    }
    next();
  }
);

module.exports = { eventRouter }