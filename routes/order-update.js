const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    let orderStatus = req.body['status'];
    let orderId = req.body['order_id'];

    db.query(`UPDATE orders SET status = '${orderStatus}' WHERE id = ${orderId} RETURNING *`)
      .then(() => {
        return db.query(`SELECT * FROM orders JOIN order_details ON orders.id = order_id JOIN menu ON menu_id = menu.id WHERE orders.id = ${orderId}`)
        // res.json({ menu }); // returning a promise with the menu as object
      })
      .then((data) => {
        let status = data.rows;
        res.render('order-update', { status });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
