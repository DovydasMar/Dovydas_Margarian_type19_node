const express = require('express');
const { dbQueryWithData } = require('../helper');
const { checkOrderBody } = require('../middleware');

const orderRouter = express.Router();

orderRouter.post('/orders', checkOrderBody, async (req, res) => {
  const { userId, shopItemId, quantity, totalPrice, status } = req.body;
  const argArr = [userId, shopItemId, quantity, totalPrice, status];
  const postSql = `INSERT INTO orders (userId, shopItemId, quantity, totalPrice, status)
     VALUES (?,?,?,?,?)`;
  const [orderObj, error] = await dbQueryWithData(postSql, argArr);
  if (error) {
    res.status(500).json({ msg: 'the server encountered a problem' });
    return;
  }
  if (orderObj.affectedRows === 1) {
    res.status(201).json({ msg: 'order placed' });
  }
});

orderRouter.get('/orders', async (req, res) => {
  const sql = `SELECT orders.orderId, orders.status, users.userName, shopitems.name, shopitems.price, orders.quantity, orders.totalPrice
  FROM orders 
  JOIN users ON users.userId = orders.userId 
  JOIN shopitems on shopitems.id = orders.shopItemId`;
  const [orderObj, error] = await dbQueryWithData(sql);
  if (error) {
    res.status(500).json({ msg: 'the server encountered a problem' });
    return;
  }
  res.json(orderObj);
});
orderRouter.get('/orders/user/:userId', async (req, res) => {
  const sql = `SELECT orders.orderId, orders.status, users.userName, shopitems.name, shopitems.price, orders.quantity, orders.totalPrice
  FROM orders 
  JOIN users ON users.userId = orders.userId 
  JOIN shopitems on shopitems.id = orders.shopItemId 
  WHERE users.userId = ?`;
  const { userId } = req.params;
  const [orderObj, error] = await dbQueryWithData(sql, [userId]);
  if (error) {
    res.status(500).json({ msg: 'the server encountered a problem' });
    return;
  }
  res.json(orderObj);
});
orderRouter.get('/orders/:orderId', async (req, res) => {
  const sql = `SELECT orders.orderId, orders.status, users.userName, shopitems.name, shopitems.price, orders.quantity, orders.totalPrice
  FROM orders 
  JOIN users ON users.userId = orders.userId 
  JOIN shopitems on shopitems.id = orders.shopItemId
  WHERE orders.orderId = ?`;
  const { orderId } = req.params;
  const [orderObj, error] = await dbQueryWithData(sql, [orderId]);
  if (error) {
    res.status(500).json({ msg: 'the server encountered a problem' });
    return;
  }
  res.json(orderObj);
});
module.exports = orderRouter;
