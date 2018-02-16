var inquirer = require("inquirer");
var mysql = require('mysql');

var connect = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "b!gPh@rma23",
    database: "bamazon"
});

connect.connect(function(err) {
    if (err) throw err;
    getList();
});

function getList() {
    connect.query("SELECT * from products", function(err, result) {
        inquirer.prompt([{
                    name: "Start",
                    type: "list",
                    message: "Enter your product ID?",
                    choices: function() {
                        var choiceArray = result.map((row) => row.item_id.toString());
                        return choiceArray
                    }
                },
                {
                    type: "input",
                    name: "Units",
                    message: "How many do you wish?"
                }
            ])
            .then(function(selection) {
                connect.query("SELECT * from products", function(err, result) {
                    if (err) throw err;
                    var prodQuantity = result[selection.Start].stock_quantity

                    if (selection.Units <= prodQuantity) {
                        connect.query(
                            "UPDATE products SET ? WHERE ?", [{
                                    stock_quantity: prodQuantity - selection.Units
                                },
                                {
                                    item_id: +selection.Start
                                }
                            ],
                            function(error) {
                                if (error) throw err;
                                console.log("Product added successfully!");
                                inquirer.prompt([{
                                        type: "boolean",
                                        name: "again",
                                        message: "Would you like to purchase another?",
                                        default: true
                                    }])
                                    .then(function(moreItems) {
                                        if (moreItems.again) {
                                            getList();
                                        } else {
                                            proces.exit();
                                        }
                                    });
                            });
                    } else {
                        console.log('Insufficient Quantity, go around the kona!!!');
                        inquirer.prompt([{
                                type: "boolean",
                                name: "again",
                                message: "Would you like to purchase another?",
                                default: false
                            }])
                            .then(function(moreItems) {
                                if (moreItems.again) {
                                    getList();
                                } else {
                                    proces.exit();
                                }
                            });
                    }
                });
            });
    });
};