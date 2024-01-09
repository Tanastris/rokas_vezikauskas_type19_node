const express = require('express');
const { dbQueryWithData } = require('../../helper');
const ordersRouter = express.Router();
// 7.1. POST/api/orders - sukurti užsakymą su user_id, shop_item_id, quantity, total_price, status

ordersRouter.post('/api/orders', async (req, res) => {
  const { user_id, shop_item_id, quantity, total_price, status } = req.body;
  const sql =
    'INSERT INTO orders (user_id, shop_item_id, quantity, total_price, status ) VALUES (?, ?, ?, ?, ?)';
  const argArr = [user_id, shop_item_id, quantity, total_price, status];
  const [rows, error] = await dbQueryWithData(sql, argArr);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  res.status(200).json(rows);
});

// 7.2. GET /api/orders - gauti visus užsakymus. gauta informacija turi būti su vartojo vardu ir prekės pavadinimu bei vieneto kaina

// 7.3. GET /api/orders/:id - gauti užsakymą pagal id

// 7.4. GET /api/orders/user/user_id-gauti visus užsakymus, priklausančius tam tikram vartotojui. gauta informacija turi būti su vartojo vardu ir prekės pavadinimu bei vieneto kaina
module.exports = ordersRouter;
