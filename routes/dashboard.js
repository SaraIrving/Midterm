const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT
    orders.id as id, user_name, user_phone, total, status, created_at, menu_id, order_details.order_id, qty, item_name, price, description, image_url
    FROM orders JOIN order_details ON orders.id = order_id JOIN menu ON menu_id = menu.id ORDER BY order_id DESC, created_at`)
      .then((data) => {
        const orders = data.rows;

        let orderPosts = {};

        for (let orderLineItem of data.rows) {

          if (!orderPosts[orderLineItem['order_id']]) {
            orderPosts[orderLineItem.order_id] = orderLineItem;
            orderPosts[orderLineItem.order_id].allItems = [[orderLineItem['item_name'],orderLineItem['qty']]];

          } else if (orderPosts[orderLineItem['order_id']]) {
            orderPosts[orderLineItem.order_id].allItems.push([orderLineItem['item_name'],orderLineItem['qty']]);
          }
        }

        // res.json({ orders });
        res.render('dashboard', { orders, orderPosts })

      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
