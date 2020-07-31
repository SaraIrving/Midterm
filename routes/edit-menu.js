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
