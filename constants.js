const dotenv = require('dotenv')
dotenv.config();

const dbUser = process.env.MYSQL_USER;
const dbPass = process.env.MYSQL_PASS;
const dbHost = process.env.MYSQL_HOST;
const dbName = process.env.MYSQL_DB;
const dbPort = process.env.MYSQL_PORT;

const appPort = process.env.APP_PORT;

module.exports = {
    dbUser,dbPass,dbHost,dbName,dbPort, appPort
}