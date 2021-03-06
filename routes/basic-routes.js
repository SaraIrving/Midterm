/*
 * All basic routes for / are defined here
 * Since this file is loaded in server.js into /,
 *   these routes are mounted onto /
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
    // Render the home page
    router.get("/", (req, res) => {
      res.render("home");
    });
    // Render the login page
    router.get("/login", (req, res) => {
      res.render("login");
    });
    // Allow admin user to login and redirect to dashboard
    router.post("/login", (req,res) => {
      res.redirect('/dashboard')
    });
    // Render the confirmation page for reference purposes
    router.get("/confirm", (req, res) => {
      let confirmedOrder = {};
      res.render("order-confirmation", { confirmedOrder });
    });

return router;
};
