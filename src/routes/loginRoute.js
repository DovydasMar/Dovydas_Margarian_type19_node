const express = require('express');
const { dbQueryWithData } = require('../helper');

const loginRouter = express.Router();

loginRouter.post('/login', async (req, res) => {
  // issitraukiam atsiustus duomenis
  const { userName, password } = req.body;
  // paieskoti vartotojo duombazej
  const sql = 'SELECT * FROM users WHERE userName = ?';
  const [rows, error] = await dbQueryWithData(sql, [userName]);
  console.log('error ===', error);
  // radom
  if (rows.length === 0) {
    res.status(400).json({
      msg: 'username or password do not match (dev username not match)',
    });
    return;
  }
  // ar sutampa slaptazodis?
  if (rows.length === 1) {
    if (password !== rows[0].password) {
      res.status(400).json({
        msg: 'username or password do not match (dev pass not match)',
      });
      return;
    }
    // Pass match // if sutampa === succ
    res.json({
      msg: 'isiloginai succ',
    });
  }
});

module.exports = loginRouter;
