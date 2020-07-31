/*
 * All routes for Menu are defined here
 * Since this file is loaded in server.js into /menu,
 *   these routes are mounted onto /menu
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // Get request to render the menu page
  router.get("/", (req, res) => {
    // Query everything from the menu table in the DB
    db.query(`SELECT * FROM menu;`)
      .then(data => {
        const menu = data.rows;
        // Render the menu ejs with all the menu items injected into it
        res.render('menu', { menu })
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
