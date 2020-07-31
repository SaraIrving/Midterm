// Load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
const menuRoutes = require("./routes/menu");
const orderRoutes = require("./routes/orders");
const orderUpdateRoutes = require("./routes/order-update");
const dashboardRoutes = require("./routes/dashboard");
const editMenuRoutes = require("./routes/edit-menu");
const newMenuItemRoutes = require("./routes/new-menu-item");
const deleteItemRoutes = require("./routes/delete-item");
const basicRoutes = require("./routes/basic-routes");

// Mount all resource routes
app.use("/menu", menuRoutes(db));
app.use("/new-menu-item", newMenuItemRoutes(db));
app.use("/delete-item", deleteItemRoutes(db));
app.use("/edit-menu", editMenuRoutes(db));
app.use("/dashboard", dashboardRoutes(db));
app.use("/orders", orderRoutes(db));
app.use("/order-update", orderUpdateRoutes(db));
app.use("/", basicRoutes());

// Listen on localhost:${PORT}
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
