/*
 * All edit-menu routes for /edit-menu are defined here
 * Since this file is loaded in server.js into /edit-menu,
 *   these routes are mounted onto /edit-menu
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // GET to bring up admin edit-menu page
  router.get("/", (req, res) => {
    // Query to get everything from menu table in DB
    db.query(`SELECT * FROM menu;`)
      .then(data => {
        const menu = data.rows;
        // Render edit-menu ejs with all the menu items injected into it
        res.render('edit-menu', { menu })
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
