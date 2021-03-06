/*
 * All dashboard routes for /new-menu-item are defined here
 * Since this file is loaded in server.js into /new-menu-item,
 *   these routes are mounted onto /new-menu-item
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // Handle post request to /new-menu-item to add or edit a menu item in DB
  router.post("/", (req, res) => {
    // Store our form data into variables
    let newItemName = req.body['new_menu_item']; // either undefined or defined
    let updatedName = req.body['update_item_name'];
    let updatedDescription = req.body['update_item_description'];
    let updatedPrice = req.body['update_item_price'] * 100;
    let updatedImage = req.body['update_image_url'];
    let oldName = req.body['menu_item'];
    // Check if we're supposed to add a new item into the menu table in DB
    if (newItemName) {
      // Insert new item into menu table in DB
      db.query(`INSERT INTO menu (item_name, price, description, image_url)
      VALUES ($1, $2, $3, $4) RETURNING *;`, [updatedName, updatedPrice, updatedDescription, updatedImage])
      .then((data) => {
        // Redirect to the edit-menu ejs which will load and display all menu item's including the new item
        res.redirect('/edit-menu');
      });
    } else { // Instead, we're updating an existing menu item in the DB
      db.query(`UPDATE menu
      SET item_name = COALESCE($1, item_name),
      price = COALESCE($2, price),
      description = COALESCE($3, description),
      image_url = COALESCE($4, image_url)
      WHERE item_name = $5
      RETURNING *;`, [updatedName, updatedPrice, updatedDescription, updatedImage, oldName])
      .then((data) => {
        // Redirect to the edit-menu ejs which will load and display all menu item's including the updated item
        res.redirect('/edit-menu');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    };
  });
  return router;
};
