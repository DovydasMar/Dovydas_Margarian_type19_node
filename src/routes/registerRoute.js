const express = require('express');
const { dbQueryWithData } = require('../helper');

const registerRouter = express.Router();

registerRouter.post('/register', async (req, res) => {
  const { userName, email, password } = req.body;
  const argArr = [userName, email, password];
  console.log('argArr ===', argArr);
  const sql = 'INSERT INTO users (userName, email, password) VALUES (?, ?, ?)';
  const [regArr, err] = await dbQueryWithData(sql, argArr);
  if (err?.code === 'ER_DUP_ENTRY') {
    res.status(400).json({
      error: 'username or email already exists',
    });
    return;
  }
  if (regArr.affectedRows === 1) {
    res.status(200).json('user created');
    return;
  }
  res.status(500).json({
    msg: 'no rows affected',
  });
});
module.exports = registerRouter;
