/*
 * All orders routes for /orders are defined here
 * Since this file is loaded in server.js into /orders,
 *   these routes are mounted onto /orders
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
// Setup twilio with credentials
const accountSid = process.env.DB_ACCOUNTSID;
const authToken = process.env.DB_AUTHTOKEN;
const client = require('twilio')(accountSid, authToken);

module.exports = (db) => {
  // Handle post request from customer to place a new order
  router.post("/", (req, res) => {
    // Assign form order data to variables
    let orderItems = [];
    let specialInstructions = req.body['special-instructions'];
    let orderPhone = req.body['customer-phone'];
    let orderName = req.body['customer-name'];
    let orderTotal = req.body['order-total'] * 100;

    // Grab all menu items from order, and push to orderItems array
    for (let [key,value] of Object.entries(req.body)) {
      if (value) {
        if (key !== 'customer-name' && key !== 'customer-phone' && key !== 'special-instructions' && key !== 'order-total') {
        orderItems.push([key,value])
        }
      }
    }

    // Define a global scope variable which will hold the current order ID, and can be used in multiple places
    let currentOrderId;
    // Set name, phone, total, and status as new order record in DB orders table
    db.query(`INSERT INTO orders (user_name, user_phone, total, status) VALUES ($1, $2, $3, 0) RETURNING *`, [orderName, orderPhone, orderTotal])
    .then((data) => {
      // Set currentOrderId to hold the order id of the menu item in question
      currentOrderId = data.rows[0].id;
      // Loop through the contents of the orderItems array to isolate the individual menu item and it's quantity
      for (let menuItem of orderItems) {
        // Insert menu item, it's respective quantity, it's order ID into the order_details table in the DB
          db.query(`INSERT INTO order_details (menu_id, order_id, qty) VALUES ((SELECT id FROM menu WHERE item_name = $1), $2, $3)`, [menuItem[0], data.rows[0].id, menuItem[1]]);
      }
    })
    .then(() => {
      // Query the DB using the currentOrderId variable to select all the data we will send in the SMS alerting the admin that an order has been placed
      db.query(`SELECT * FROM orders JOIN order_details ON orders.id = order_id JOIN menu ON menu_id = menu.id WHERE order_id = ${currentOrderId}`)
      .then((data) => {
        // Define orderBreakdown and build the body of the SMS we send to the admin
        let orderBreakdown = `New order from ${data.rows[0].user_name}, who ordered `;
        for (let orderItem of data.rows) {
          orderBreakdown += `${orderItem.item_name} x ${orderItem.qty} `;
        }
        orderBreakdown += `Contact number is: ${orderPhone}`;
        if (specialInstructions) {
          orderBreakdown += ` Note from customer: ${specialInstructions}`;
        }
        orderBreakdown += ` Please confirm pickup time in minutes`;
        // Send SMS to admin user containing all the order info from newly placed order
        client.messages.create({
          to: '+17789298779',
          from: '+15879068570',
          body: orderBreakdown
        });

        // User is now in pending state, so we're checking for when the status gets confirmed from the admin
        const interval = setInterval(() => {
          // Query the DB order table for status update
          db.query(`SELECT id, user_name, status, total FROM orders WHERE id = ${currentOrderId}`)
          .then((data) => {
            // Check if it's been updated
            if (data.rows[0].status !== '0') {
                let confirmedOrder = data.rows[0];
                clearInterval(interval);
                // Render order-confirmation ejs with confirmedOrder info for the customer
                res.render('order-confirmation',{ confirmedOrder });
            }
          })
        }, 7000);
      })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

  });
  return router;
};
