const express = require('express');
const rolesRouter = express.Router();
const { dbQueryWithData } = require('../../helper');

// 8. Sukurti GET maršruta/api/user_roles-gauti visas roles
rolesRouter.get('/api/user_roles', async (req, res) => {
  const sql = 'SELECT * FROM user_roles';
  const [rows, error] = await dbQueryWithData(sql);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  res.json(rows);
});
module.exports = rolesRouter;
