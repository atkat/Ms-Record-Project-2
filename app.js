// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npomjs.com/package/hbs
const hbs = require("hbs");

const app = express();
require("./config")(app);

// session configuration
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('./db/index');

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    },
    saveUninitialized: false,
    resave: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost/Project-2-Discogs"
    })
  })
)
// end of session

// default value for title local
const projectName = "node-basic-auth";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

// app.locals.title = `${capitalized(projectName)} created with Ironlauncher`;

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const auth = require("./routes/auth");
app.use("/", auth);

const artist = require("./routes/artist");
app.use("/", artist);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;