const express = require('express');
const router  = express.Router();

const accountSid = process.env.DB_ACCOUNTSID;
const authToken = process.env.DB_AUTHTOKEN;
const client = require('twilio')(accountSid, authToken);

module.exports = (db) => {
  router.post("/", (req, res) => {
    let orderStatus = req.body['status'];
    let orderId = req.body['order_id'];
    let customerPhone = `+1${req.body['customer_phone']}`;
    console.log("customerPhone = ", customerPhone);

    db.query(`UPDATE orders SET status = '${orderStatus}' WHERE id = ${orderId} RETURNING *`)
      .then(() => {
        return db.query(`SELECT * FROM orders JOIN order_details ON orders.id = order_id JOIN menu ON menu_id = menu.id WHERE orders.id = ${orderId}`)
        // res.json({ menu }); // returning a promise with the menu as object
      })
      .then((data) => {

        client.messages.create({
          to: customerPhone,
          from: '+15879068570',
          body: `Your order is confirmed, pickup from Captain Clucks in ${orderStatus} minutes!`
        });

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
