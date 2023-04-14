// import createPool from 'mysql2/promise';
// // const { createPool } = pkg;
// let client = undefined

// export async function connectToDatabase() {
//   if (client) return client

//   client = await createPool({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PWD,
//     database: process.env.DB,
//     waitForConnections: true,
//     connectionLimit: 100,
//     queueLimit: 0
//   })
// console.log(client);
//   return client
// }


const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'freelogogenerator',
  port : 3306
});
module.exports = connection