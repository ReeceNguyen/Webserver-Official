var mysql = require("mysql");
var sqlcon = mysql.createConnection({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_KEY,
  database: process.env.SQL_STATION_1,
  dateStrings: true,
});
var sqlcon_s2 = mysql.createConnection({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_KEY,
  database: process.env.SQL_STATION_2,
  dateStrings: true,
});

module.exports = {
    sqlcon,
    sqlcon_s2
}