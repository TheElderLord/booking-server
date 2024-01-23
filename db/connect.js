const mysql = require('mysql2');

const { dbHost, dbUser, dbPass, dbName, dbPort } = require('../constants')


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

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database!');
    connection.release();
  }
});

function query(sql, values) {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}



module.exports = query;
