const express = require('express');

const itemTypesRouter = express.Router();
const { dbQueryWithData } = require('../../helper');

itemTypesRouter.get('/api/item_types', async (req, res) => {
  const sql = 'SELECT * FROM item_types';
  const [rows, error] = await dbQueryWithData(sql);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  res.json(rows);
});
module.exports = itemTypesRouter;
