const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'us-cdbr-iron-east-01.cleardb.net',
  user: 'b76d5d1742d8f9',
  password: '63a88922',
  database: 'heroku_04ee7e5dbb2366e'
})

db.connect((err) => {
    if (err) {
        return err;
    } else {
        console.log('You are connected to the database');
    }
});

setInterval(function () {
  db.query('SELECT 1');
}, 5000);

module.exports = db;