var inquirer = require("inquirer");
var mysql = require('mysql');
const cTable = require('console.table');

var connect = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "b!gPh@rma23",
    database: "bamazon"
});

connect.connect(function(err) {
    if (err) throw err;
    spvsrList();
});

function spvsrList() {
    connect.query("SELECT * from departments", function(err, result) {

        inquirer.prompt([{
            name: "supervisor",
            type: "list",
            message: "Choose from the list below?",
            choices: [
                "View Product Sales by Department",
                "Create New Department"
            ]
        }]).then(function(supTools) {
            console.log("this is working, sort of")
        })
    })
}