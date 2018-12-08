const mysql = require('mysql');

mysql://bb8abbd3ae5ff6:2acd9605@us-cdbr-iron-east-01.cleardb.net/heroku_93623aee4ffde4e?reconnect=true

const db = mysql.createConnection({
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'bb8abbd3ae5ff6',
    password: '2acd9605',
    database: 'heroku_93623aee4ffde4e'
})

db.connect((err) => {
    if (err) {
        return err;
    } else {
        console.log('You are connected to the database');
    }
});

module.exports = db;