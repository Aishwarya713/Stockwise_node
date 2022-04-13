const mysql = require("mysql2");
const dbConfig = require("../config/db.config");
var db_config = {
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  connectionLimit : 10,
}
// Create a connection to the database
const connection = mysql.createPool(db_config);

module.exports = connection.promise();