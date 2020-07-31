const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    let newItemName = req.body['new_menu_item']; // either undefined or defined
    // let itemName = req.body['menu_item']; // either undefined of defined
    let updatedName = req.body['update_item_name'];
    let updatedDescription = req.body['update_item_description'];
    let updatedPrice = req.body['update_item_price'];
    let updatedImage = req.body['update_image_url'];
    let oldName = req.body['menu_item'];

    // console.log('req.body = ', req.body);
    // console.log('oldName when editing an existing item = ', oldName);
    // console.log("newItemName = ", newItemName);

    if (newItemName) {
      console.log('updatedPrice', updatedPrice);
      db.query(`INSERT INTO menu (item_name, price, description, image_url)
      VALUES ('${updatedName}', ${updatedPrice}, '${updatedDescription}','${updatedImage}') RETURNING *;`)
      .then((data) => {
        res.redirect('/edit-menu');
      });
    } else {
      db.query(`UPDATE menu
      SET item_name = COALESCE('${updatedName}', item_name),
      price = COALESCE(${updatedPrice}, price),
      description = COALESCE('${updatedDescription}', description),
      image_url = COALESCE('${updatedImage}', image_url)
      WHERE item_name = '${oldName}'
      RETURNING *;`)




//       UPDATE some_table SET
//   column_1 = COALESCE(param_1, column_1),
//   column_2 = COALESCE(param_2, column_2),
//   column_3 = COALESCE(param_3, column_3),
//   column_4 = COALESCE(param_4, column_4),
//   column_5 = COALESCE(param_5, column_5)
// WHERE id = some_id;



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
