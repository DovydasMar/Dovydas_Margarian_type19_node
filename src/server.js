require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const testConnection = require('./routes/testconn');
const registerRouter = require('./routes/registerRoute');
const loginRouter = require('./routes/loginRoute');
const shopItemRouter = require('./routes/shopItemsRoute');
const orderRouter = require('./routes/orderRoutes');
const roleRouter = require('./routes/rolesRoute');

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/api/auth', registerRouter);
app.use('/api/auth', loginRouter);
app.use('/api', shopItemRouter);
app.use('/api', orderRouter);
app.use('/api', roleRouter);
testConnection();

app.get('/', (req, res) => {
  res.json('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server runing on http://localhost:${PORT}`);
});
