const express = require('express');
const { dbQueryWithData } = require('../helper');
const { checkLoginBody } = require('../middleware');

const loginRouter = express.Router();

loginRouter.post('/login', checkLoginBody, async (req, res) => {
  // issitraukiam atsiustus duomenis
  const { email, password } = req.body;
  // paieskoti vartotojo duombazej
  const sql = 'SELECT * FROM users WHERE email = ?';
  const [rows, error] = await dbQueryWithData(sql, [email]);
  console.log('error ===', error);
  // radom
  if (rows.length === 0) {
    res.status(400).json(rows);
    return;
  }
  // ar sutampa slaptazodis?
  if (rows.length === 1) {
    if (password !== rows[0].password) {
      res.status(400).json({ error: "username or password doesn't match" });
      return;
    }
    // Pass match // if sutampa === succ
    console.log('rows ===', rows);
    res.json({
      msg: 'isiloginai succ',
    });
  }
});

module.exports = loginRouter;
