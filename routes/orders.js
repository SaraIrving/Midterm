


const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    let orderItems = [];
    let specialInstructions = req.body['special-instructions'];
    let orderPhone = req.body['customer-phone'];
    let orderName = req.body['customer-name'];
    let orderTotal = req.body['order-total'];

    for (let [key,value] of Object.entries(req.body)) {
      if (value) {
        if (key !== 'customer-name' && key !== 'customer-phone' && key !== 'special-instructions' && key !== 'order-total') {
        orderItems.push([key,value])
        }
      }
    }


    //put name, phone, total into orders table

    db.query(`INSERT INTO orders (user_name, user_phone, total, status) VALUES ('${orderName}', ${orderPhone}, ${orderTotal}, 'pending') RETURNING *`)
    .then((data) => {
      for (let menuItem of orderItems) {
          db.query(`INSERT INTO order_details (menu_id, order_id, qty) VALUES ((SELECT id FROM menu WHERE item_name = '${menuItem[0]}'), ${data.rows[0].id}, ${menuItem[1]})`);
      }
      res.redirect('/menu');
    })
    .catch((err) => {
      console.log(err);
    })

  });
  return router;
};