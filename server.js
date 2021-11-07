// get the client
const mysql = require('mysql2');
// get console.table
const cTable = require('console.table');

// create connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'emanagement'
  });

//test query
connection.query(
    'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
    function(err, results, fields) {
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    }
  );
//   first call to console.table
console.table([
    

])