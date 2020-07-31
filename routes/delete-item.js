const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const itemToDelete = req.body['item_name'];
    console.log("delete router req.body = ", req.body);
    db.query(`DELETE FROM menu WHERE item_name = '${itemToDelete}';`)
      .then(data => {
        res.redirect('edit-menu');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
