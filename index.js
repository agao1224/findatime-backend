const express = require("express");
const bodyParser = require("body-parser");

const connectDB = require("./config/db.js");

const { eventRouter } = require("./routes/event-routes.js");
const { loginRouter } = require("./routes/login-routes.js");

connectDB();

const app = express();
const port = process.env.PORT;

// Use bodyparser to parse POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes for /event
app.use("/events", eventRouter);

// Routes for /login
app.use("/login", loginRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})