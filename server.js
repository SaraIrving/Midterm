// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');

//need for twilio response

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
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const menuRoutes = require("./routes/menu");
const orderRoutes = require("./routes/orders");
const orderUpdateRoutes = require("./routes/order-update");
const dashboardRoutes = require("./routes/dashboard");
const editMenuRoutes = require("./routes/edit-menu");
const newMenuItemRoutes = require("./routes/new-menu-item");
const deleteItemRoutes = require("./routes/delete-item");


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/menu", menuRoutes(db));
app.use("/new-menu-item", newMenuItemRoutes(db));
app.use("/delete-item", deleteItemRoutes(db));
app.use("/edit-menu", editMenuRoutes(db));
app.use("/dashboard", dashboardRoutes(db));
app.use("/orders", orderRoutes(db));
app.use("/order-update", orderUpdateRoutes(db));
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req,res) => {
  res.redirect('/dashboard')
});

app.get("/confirm", (req, res) => {
  let confirmedOrder = {};
  res.render("order-confirmation", { confirmedOrder });
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
