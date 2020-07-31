const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM menu;`)
      .then(data => {
        const menu = data.rows;
        // res.json({ menu }); // returning a promise with the menu as object
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
