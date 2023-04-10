var mysql = require('mysql')
var pool = mysql.createPool({ 
    
    host: 'sql.freedb.tech',
    port: 3306,
    user: 'freedb_ultimate',
    password: '@W$2fW2??&8ea#$',
    database: 'freedb_ultimateGarments',
    connectionLimit: 100


})

module.exports = pool;


