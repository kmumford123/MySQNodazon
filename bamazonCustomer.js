var inquirer = require("inquirer");
var mysql = require('mysql');
var importMysql = require('node-mysql-importer')
var keys = require("./keys.js");
var Database = require('./zon.sql');

var dbpwd = new dbpwd(keys.dbpwd);

'use strict'
const importer = require('node-mysql-importer')

importer.config({
    'host': 'localhost',
    'user': 'root',
    'password': dbpwd,
    'database': 'bamazon'
})

importer.importSQL('./zon.sql').then(() => {
    console.log('all statements have been executed')
}).catch(err => {
    console.log(`error: ${err}`)
})



// var connect = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: dbpwd,
//     database: "bamazon"
// });

var productIDS = con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT item_id FROM products", function(err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
});

inquirer.prompt([{
        type: "list",
        name: "Start",
        message: "Select your product ID?",
        choices: ProductIDs
    },
    {
        type: "input",
        name: "Units",
        message: "How many do you wish?"
    }
]).then(function(selection) {
    var itemCheck = con.connect(function(err) {
        if (err) throw err;
        con.query(`SELECT stock_quantity FROM products WHERE item_id = '${selection.Start}'`, function(err, result, fields) {
            if (err) throw err;
            return result;
        });
    });
    if (itemCheck < selection.Units) {
        console.log('Insufficient Quantity, go around the kona!!!');
    } else {
        var newQuantity = itemCheck - selection.Units;
        var updateItem = con.connect(function(err) {
            if (err) throw err;
            con.query(`UPDATE products set stock_quantity = ${newQuantity} products WHERE item_id = '${selection.Start}'`, function(err, result, fields) {
                if (err) throw err;
                console.log(`there are ${result} of these remaining`);
            });
            return selection.Units;
        });
    };
});