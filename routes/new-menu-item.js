const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    let newItemName = req.body['new_menu_item']; // either undefined or defined
    let itemName = req.body['menu_item']; // either undefined of defined
    let updatedName = req.body['update_item_name'];
    let updatedDescription = req.body['update_item_description'];
    let updatedPrice = req.body['update_item_price'];
    let updatedImage = req.body['update_image_url'];
    let oldName = req.body['menu_item'];


    if (newItemName) {
      db.query(`INSERT INTO menu (item_name, price, description, image_url)
      VALUES ('${itemName}', ${updatedPrice}, '${updatedDescription}','${updatedImage}') RETURNING *`)
      .then((data) => {
        res.redirect('/edit-menu');
      });
    } else {
      db.query(`UPDATE menu
      SET item_name = '${itemName}',
      SET price = ${updatedPrice},
      SET description = '${updatedDescription}',
      SET image_url = '${updatedImage}',
      WHERE item_name = '${oldName}'
      RETURNING *`)
      .then((data) => {
        res.redirect('/edit-menu');
      })
      .catch((err) => {
        console.log('error: ', err);
      });
    };
  });
  return router;
};
