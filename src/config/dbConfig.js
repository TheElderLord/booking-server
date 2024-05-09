const mysql = require('mysql2');

const { dbHost, dbUser, dbPass, dbName, dbPort } = require('../constant/constants')


// Create a connection pool
const pool = mysql.createPool({
  host: dbHost,
  user: dbUser,
  password: dbPass,
  database: dbName,
  port:dbPort,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;