const dotenv = require('dotenv')
const path = require('path');
const fs = require('fs');


// dotenv.config();

// Determine which .env file to load
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';

// Load the environment variables from the file
const envPath = path.resolve(__dirname,`../../`, envFile);
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  console.error(`Environment file ${envPath} not found`);
  process.exit(1);
}

const dbUser = process.env.MYSQL_USER;
const dbPass = process.env.MYSQL_PASS;
const dbHost = process.env.MYSQL_HOST;
const dbName = process.env.MYSQL_DB;
const dbPort = process.env.MYSQL_PORT;

const appPort = process.env.APP_PORT;

module.exports = {
    dbUser,dbPass,dbHost,dbName,dbPort, appPort
}