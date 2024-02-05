var mysql = require("mysql");
// STATION 1 DATABASE
var sqlcon = mysql.createConnection({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_KEY,
  database: process.env.SQL_STATION_1,
  dateStrings: true,
});
// STATION 2 DATABASE
var sqlcon_s2 = mysql.createConnection({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_KEY,
  database: process.env.SQL_STATION_2,
  dateStrings: true,
});
// ACCOUNT DATA
var sqlaccount = mysql.createConnection({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_KEY,
  database: process.env.SQL_ACCOUNT,
  dateStrings: true,
});

module.exports = {
    sqlcon,
    sqlcon_s2,
    sqlaccount,
}