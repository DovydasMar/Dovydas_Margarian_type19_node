const express = require('express');
const { dbQueryWithData } = require('../helper');

const roleRouter = express.Router();

roleRouter.get('/user_roles', async (req, res) => {
  const sql = 'SELECT * FROM userroles';
  const [roleObj, error] = await dbQueryWithData(sql);
  if (error) {
    res.status(500).json({ msg: 'the server encountered a problem' });
    return;
  }

  res.json(roleObj);
});
roleRouter.post('/user_roles', async (req, res) => {
  const { email } = req.body;
  const sql = `SELECT users.userId, users.roleId, userroles.name, users.email FROM users
    JOIN userroles ON users.roleId = userroles.roleId
    WHERE users.email = ?`;
  const [roleObj, error] = await dbQueryWithData(sql, [email]);
  if (error) {
    res.status(500).json({ msg: 'the server encountered a problem' });
    return;
  }
  res.json(roleObj);
});

module.exports = roleRouter;
