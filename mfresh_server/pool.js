// introduce mysql module
const mysql = require("mysql");
// create a database connection pool
var pool = mysql.createPool({
    host:"127.0.0.1",
    port:"3306",
    user:"root",
    password:"",
    database:"mfresh",
    connectionLimit:10
});

// export the database connection pool
module.exports = pool;