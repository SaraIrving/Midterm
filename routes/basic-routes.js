

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
    // render the home page
    router.get("/", (req, res) => {
      res.render("home");
    });
    // render the login page
    router.get("/login", (req, res) => {
      res.render("login");
    });
    // allow admin user to login and redirect to dashboard
    router.post("/login", (req,res) => {
      res.redirect('/dashboard')
    });
    //render the confirmation page for reference purposes
    router.get("/confirm", (req, res) => {
      let confirmedOrder = {};
      res.render("order-confirmation", { confirmedOrder });
    });

return router;
};
