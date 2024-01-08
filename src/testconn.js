const mysql = require('mysql2/promise');
const { dbConfig } = require('./config');

async function testConnection() {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    await conn.query('SELECT * FROM users LIMIT 1');
    console.log('succ connected to mySQL');
  } catch (error) {
    console.log('testConnection failed, did you start XAMPP???');
  } finally {
    if (conn) conn.end();
  }
}
module.exports = testConnection;
