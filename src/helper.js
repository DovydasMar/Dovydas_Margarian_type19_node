const mysql = require('mysql2/promise');
const { dbConfig } = require('./config');

async function dbQueryWithData(sql, argArr = []) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const [rows] = await conn.query(sql, argArr);
    // console.log('rows ===', rows);
    return [rows, null];
  } catch (error) {
    return [null, error];
  } finally {
    if (conn) conn.end();
  }
}

module.exports = {
  dbQueryWithData,
};
