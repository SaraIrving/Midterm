/*
 * All delete-item routes for /delete-item are defined here
 * Since this file is loaded in server.js into /delete-item,
 *   these routes are mounted onto /delete-item
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // POST to remove an item from the edit-menu admin page
  router.post("/", (req, res) => {
    // Assign item in question to itemToDelete
    const itemToDelete = req.body['item_name'];
    // Delete itemToDelete from the menu table
    db.query(`DELETE FROM menu WHERE item_name = '${itemToDelete}';`)
      .then(() => {
        // Redirect back to edit-menu page which will load all the items except the recently deleted one
        res.redirect('edit-menu');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
