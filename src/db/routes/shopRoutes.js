const express = require('express');
const { dbQueryWithData } = require('../../helper');

const shopRouter = express.Router();

// 5. Sukurti CRUD maršrutus/operacijas parduotuvės prekėms

// 5.1. POST/api/shop_items - sukurti parduotuvės prekę su name, price, description, image, item_type_id

shopRouter.post('/api/shop_items', async (req, res) => {
  const {
    shop_item_name,
    shop_item_price,
    shop_item_description,
    shop_item_image,
    item_type_id,
  } = req.body;
  const sql =
    'INSERT INTO shop_items (shop_item_name, shop_item_price, shop_item_description, shop_item_image, item_type_id) VALUES (?, ?, ?, ?, ?)';
  const argArr = [
    shop_item_name,
    shop_item_price,
    shop_item_description,
    shop_item_image,
    item_type_id,
  ];
  const [rows, error] = await dbQueryWithData(sql, argArr);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  res.status(200).json(rows);
});

// 5.2. GET /api/shop_items - gauti visas parduotuvės prekes
shopRouter.get('/api/shop_items', async (req, res) => {
  const sql =
    'SELECT shop_item_id, shop_item_name, shop_item_price, shop_item_description, shop_item_image, item_type_id FROM shop_items WHERE isDeleted=0';
  const [rows, error] = await dbQueryWithData(sql);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  res.json(rows);
});

// 5.3. GET /api/shop_items/:id - gauti parduotuvės prekę pagal id
shopRouter.get('/api/shop_items/:id', async (req, res) => {
  const itemId = +req.params.id;
  const sql = 'SELECT * FROM shop_items WHERE shop_item_id=? AND isDeleted=0';
  const [rows, error] = await dbQueryWithData(sql, [itemId]);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  res.json(rows);
});

// 5.4. DELETE/api/shop_items/:id - ištrinti parduotuvės prekę pagal id
shopRouter.delete('/api/shop_items/:id', async (req, res) => {
  const itemId = +req.params.id;
  const sql = `
  UPDATE shop_items
  SET isDeleted=1
  WHERE shop_item_id=?
  LIMIT 1
  `;
  const [rows, error] = await dbQueryWithData(sql, [itemId]);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  if (rows.affectedRows === 1) {
    res.json({ msg: 'item deleted' });
    return;
  }
  res.status(400).json(rows);
});

module.exports = shopRouter;
