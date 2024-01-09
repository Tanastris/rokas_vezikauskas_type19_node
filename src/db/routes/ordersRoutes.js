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

ordersRouter.get('/api/orders', async (req, res) => {
  const sql =
    'SELECT users.user_name, shop_items.shop_item_name, shop_items.shop_item_price FROM users JOIN orders ON users.user_id = orders.user_id JOIN shop_items ON shop_items.shop_item_id = orders.shop_item_id';
  const [rows, error] = await dbQueryWithData(sql);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  res.json(rows);
});

// 7.3. GET /api/orders/:id - gauti užsakymą pagal id

ordersRouter.get('/api/orders/:id', async (req, res) => {
  const itemId = +req.params.id;
  const sql = 'SELECT * FROM orders WHERE order_id=?';
  const [rows, error] = await dbQueryWithData(sql, [itemId]);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  res.json(rows[0]);
});

// 7.4. GET /api/orders/user/user_id-gauti visus užsakymus, priklausančius tam tikram vartotojui. gauta informacija turi būti su vartojo vardu ir prekės pavadinimu bei vieneto kaina

ordersRouter.get('/api/orders/user/:user_id', async (req, res) => {
  const userId = +req.params.user_id;
  const sql =
    'SELECT users.user_name, shop_items.shop_item_name, shop_items.shop_item_price FROM orders JOIN users ON users.user_id = orders.user_id JOIN shop_items ON shop_items.shop_item_id = orders.shop_item_id WHERE orders.user_id=?';

  const [rows, error] = await dbQueryWithData(sql, [userId]);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  res.json(rows);
});

module.exports = ordersRouter;
