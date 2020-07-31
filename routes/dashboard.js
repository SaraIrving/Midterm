/*
 * All dashboard routes for /dashboard are defined here
 * Since this file is loaded in server.js into /dashboard,
 *   these routes are mounted onto /dashboard
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // GET to bring up dashboard for admin user
  router.get("/", (req, res) => {
    // Query DB grab all info from tables
    db.query(`SELECT
    orders.id as id, user_name, user_phone, total, status, created_at, menu_id, order_details.order_id, qty, item_name, price, description, image_url
    FROM orders JOIN order_details ON orders.id = order_id JOIN menu ON menu_id = menu.id ORDER BY order_id DESC, created_at`)
      .then((data) => {
        // Define object for storing order info with order items stored as array into object keys which refer to order ID
        let orderPosts = {};
        // Loop through returned data (data.rows contains an array containing an object for each menu item, lots of redundant info)
        for (let orderLineItem of data.rows) {
          // Check if our orderPosts object doesn't already contain an object with this order ID
          if (!orderPosts[orderLineItem['order_id']]) {
            // Create object in orderPosts with the orderLineItem object
            orderPosts[orderLineItem.order_id] = orderLineItem;
            // Create an array inside the newly added order object called allItems.
            // allItems array will contain an array holding the current (and future) menu item names and qty's
            // associated with the order ID.
            orderPosts[orderLineItem.order_id].allItems = [[orderLineItem['item_name'],orderLineItem['qty']]];
            // Check if order ID object is already in our orderPosts
          } else if (orderPosts[orderLineItem['order_id']]) {
            // Push new item name and qty to this order ID allItems array
            orderPosts[orderLineItem.order_id].allItems.push([orderLineItem['item_name'],orderLineItem['qty']]);
          }
        }
        // After orderPosts has been populated with all our orders, render the dashboard ejs, with the orderPosts object.
        res.render('dashboard', { orderPosts })
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
