const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    port: '3309',
    user: 'root',
    password: '',
    database: 'doctorforumm'
});

db.connect( (err) => {
    if(err){
        throw err;
    }
    console.log("Connected to MYSQL Database");
})

module.exports = db;