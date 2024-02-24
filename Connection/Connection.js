var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'job_portal'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting to database: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});


module.exports = {connection}