const express = require('express');
const { dbQueryWithData } = require('../../helper');

const userRouter = express.Router();

// 4. Sukurti CRUD maršrutus/operacijas vartotojams

// 4.1. POST /api/auth/register - registruoti vartotoją su name, email, password, role_id

userRouter.post('/api/auth/register', async (req, res) => {
  const {
    user_name: name,
    user_email: email,
    user_password: password,
    role_id: roleId,
  } = req.body;
  const sql =
    'INSERT INTO users (user_name, user_email, user_password, role_id) VALUES (?, ?, ?, ?)';
  const argArr = [name, email, password, roleId];
  const [rows, error] = await dbQueryWithData(sql, argArr);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  res.status(200).json(rows);
});

// 4.2. POST/api/auth/login - prisijungti vartotoją naudojant email ir password

userRouter.post('/api/auth/login', async (req, res) => {
  const { user_email: email, user_password: password } = req.body;
  const sql = 'SELECT * FROM users WHERE user_email = ? AND user_password = ?';
  const argArr = [email, password];
  console.log('argArr ===', argArr);
  const [rows, error] = await dbQueryWithData(sql, argArr);
  console.log('rows ===', rows);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  if (rows.length === 0) {
    res
      .status(404)
      .json({ error: 'Email and password do not match or user do not exist' });
    return;
  }

  res.status(200).json(rows);
});

module.exports = userRouter;
