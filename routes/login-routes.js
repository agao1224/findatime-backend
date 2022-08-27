/**
 * @Imports
 */
const express = require("express");
const { check, validationResult } = require("express-validator");

const { postLoginEvent } = require("../controllers/login-controller.js");

const loginRouter = express.Router();

/**
 * @Route POST /event/[event URI]/login
 * 
 * @brief Fetches information regarding a 
 *        specific event
 */
loginRouter.post("/:eventURI",
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

module.exports = { loginRouter } 