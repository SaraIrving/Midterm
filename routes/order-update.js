/*
 * All order-update routes for /order-update are defined here
 * Since this file is loaded in server.js into /order-update,
 *   these routes are mounted onto /order-update
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
// Setup twilio with credentials
const accountSid = process.env.DB_ACCOUNTSID;
const authToken = process.env.DB_AUTHTOKEN;
const client = require('twilio')(accountSid, authToken);

module.exports = (db) => {
  // Handle the post request from the admin user to update a recently placed order status in the DB
  router.post("/", (req, res) => {
    // Assign form data to variables
    let orderStatus = req.body['status'];
    let orderId = req.body['order_id'];
    let customerPhone = `+1${req.body['customer_phone']}`;
    // Update order status on orders table in the DB
    db.query(`UPDATE orders SET status = '${orderStatus}' WHERE id = ${orderId} RETURNING *`)
      .then(() => {
        // Query to get all the order information to send info to customer
        return db.query(`SELECT * FROM orders JOIN order_details ON orders.id = order_id JOIN menu ON menu_id = menu.id WHERE orders.id = ${orderId}`)
      })
      .then((data) => {
        // Text the customer confirming their order and specifying the wait time
        client.messages.create({
          to: customerPhone,
          from: '+15879068570',
          body: `Your order is confirmed, pickup from Captain Clucks in ${orderStatus} minutes!`
        });
        // Redirect to the dashboard where admin user can see the order status change from pending to in progress
        res.redirect('dashboard');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
