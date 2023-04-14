const express = require('express');
const cors = require('cors');
//const dateTime = require('node-datetime');

const connection = require('./database/connection.js');

const app = express()
const PORT = process.env.PORT || 8000;
//app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

connection.connect()
let tableName = 'order_items';
// let order_table = 'order_transactions'
let currDate = new Date().toJSON().slice(0, 10);
var today = new Date()
var prevDate = new Date(new Date().setDate(today.getDate() - 30)).toJSON().slice(0, 10);



app.get("/api/getorder", async (req, res) => {
    let sql = 'SELECT created_at, COUNT(*) AS TotalOrders, ';
    sql += 'sum(case when type = "saved" then 1 else 0 end) AS logoCount ';
    sql += 'FROM ' + tableName + ' ';
    sql += 'WHERE type = "saved" AND created_at between "' + prevDate + '" AND "' + currDate + '" ';
    sql += 'GROUP BY DATE_FORMAT(created_at, "%y-%m-%d") ';
    sql += 'ORDER BY created_at DESC ';

    connection.query(sql, function (error, results, fields) {

        console.log('The result is SQL: ', results);
        // connection.end();

        res.send(results);

    });


});


app.listen(PORT, () => {
    console.log((`Server is running ${PORT}`));
});



