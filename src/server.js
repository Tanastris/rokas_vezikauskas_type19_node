require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mysql = require('mysql2/promise');
const { dbConfig } = require('./config');
const userRouter = require('./db/routes/userRoutes');
const shopRouter = require('./db/routes/shopRoutes');
const ordersRouter = require('./db/routes/ordersRoutes');

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  res.json('Hello World');
});
app.use('/', userRouter);
app.use('/', shopRouter);
app.use('/', ordersRouter);

testConnection();
// connect
async function testConnection() {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    await conn.query('SELECT * FROM orders LIMIT 1');
    console.log('Succesfuly connected to mysql');
  } catch (error) {
    console.log('testConnection failed, did you start XAMPP mate???');
    console.log(error);
  } finally {
    if (conn) conn.end();
  }
}

app.listen(PORT, () => {
  console.log(`Server runing on http://localhost:${PORT}`);
});
