const express = require('express');
const { dbQueryWithData } = require('../helper');
const { checkItemBody } = require('../middleware');

const shopItemRouter = express.Router();

shopItemRouter.post('/shop_items', checkItemBody, async (req, res) => {
  const sql =
    'INSERT INTO shopitems (name, price, description, image, itemTypeId) VALUES ( ?, ?, ?, ?, ?)';
  const { name, price, description, image, itemTypeId } = req.body;
  const argarr = [name, price, description, image, itemTypeId];
  const [shopItemObj, error] = await dbQueryWithData(sql, argarr);
  if (error) {
    res.status(500).json({
      error: 'something went wrong',
    });
  }
  if (shopItemObj.affectedRows === 1) {
    res.status(201).json('created');
  }
});

shopItemRouter.get('/shop_items', async (req, res) => {
  const sql = 'SELECT * FROM shopitems Where isDeleted = 0';
  const [shopItemObj, error] = await dbQueryWithData(sql);
  if (error) {
    res.status(500).json({
      error: 'something went wrong',
    });
  }

  res.json(shopItemObj);
});
shopItemRouter.get('/shop_items/:id', async (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM shopitems where id = ?';
  const [shopItemObj, error] = await dbQueryWithData(sql, [id]);
  if (error) {
    res.status(500).json({
      error: 'something went wrong',
    });
  }
  res.json(shopItemObj);
});
shopItemRouter.delete('/shop_items/:id', async (req, res) => {
  const { id } = req.params;
  const sql = 'UPDATE shopitems SET isDeleted = 1 WHERE shopitems.id = ?;';
  const [rows, error] = await dbQueryWithData(sql, [id]);
  if (error) {
    res.status(500).json({
      error: 'something went wrong',
    });
  }
  if (rows.affectedRows === 1) {
    res.json({ msg: `item with id: ${id} was deleted` });
  }
});
shopItemRouter.get('/item_types', async (req, res) => {
  try {
    const sql = 'SELECT * FROM itemtypes';
    const [rows, error] = await dbQueryWithData(sql);

    if (error) {
      res.status(500).json(error);
    } else {
      res.json(rows);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = shopItemRouter;
