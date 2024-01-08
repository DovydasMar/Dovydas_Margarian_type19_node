const express = require('express');
const { dbQueryWithData } = require('../helper');
const { checkRegBody } = require('../middleware');
// const checkRegBody = require('../middleware');

const registerRouter = express.Router();

registerRouter.post('/register', checkRegBody, async (req, res) => {
  const { userName, email, password, roleId } = req.body;
  const argArr = [userName, email, password, roleId];
  console.log('argArr ===', argArr);
  const sql =
    'INSERT INTO users (userName, email, password, roleId) VALUES (?, ?, ?, ?)';
  const [regArr, err] = await dbQueryWithData(sql, argArr);
  if (err?.code === 'ER_DUP_ENTRY') {
    res.status(400).json([{ field: 'email', error: 'email already exists' }]);
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
