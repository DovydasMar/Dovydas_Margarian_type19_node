const express = require('express');
const { dbQueryWithData } = require('../helper');

const userRouter = express.Router();

userRouter.get('/users', async (req, res) => {
  const sql = 'select userName, userId  from users';
  const [userArr, error] = await dbQueryWithData(sql);
  if (error) {
    res.status(500).json({
      error: 'something went wrong',
    });
  }
  res.json(userArr);
});
userRouter.post('/users', async (req, res) => {
  const sql = 'select userId from users where email = ?';
  const { email } = req.body;
  const [userArr, error] = await dbQueryWithData(sql, [email]);
  if (error) {
    res.status(500).json({
      error: 'something went wrong',
    });
  }
  res.json(userArr);
});

module.exports = userRouter;
