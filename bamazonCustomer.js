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
    makePurchase();
});

function makePurchase() {
    connect.query("SELECT item_id, product_name, department_name, price, stock_quantity from products", function(err, result) {
        if (err) throw err;
        console.table(result);
        inquirer.prompt([{
                    name: "Start",
                    type: "list",
                    message: "Enter your Item ID?",
                    choices: function() {
                        return result.map((row) => `${row.item_id}`);
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
                    var prodQuantity = result[selection.Start - 1].stock_quantity;
                    if (selection.Units <= prodQuantity) {
                        var salesUpdate = +selection.Units * result[selection.Units - 1].price;
                        var currentPsales = result[selection.Units - 1].product_sales;
                        var qtyupdate = prodQuantity - selection.Units;
                        console.log(salesUpdate);
                        connect.query(
                            "UPDATE products SET ? WHERE ?", [{
                                    product_sales: salesUpdate + currentPsales
                                },
                                {
                                    item_id: +selection.Start
                                }
                            ],
                            function(error) {
                                if (error) throw err;
                                var deptValue = result[selection.Start - 1].department_name;
                                console.log(`Transaction Complete!!! ${qtyupdate} left in stock.`);
                                "UPDATE departments SET ?", [{
                                        product_sales: salesUpdate + currentPsales
                                    },
                                    {
                                        item_id: JSON.stringify(deptValue)
                                    }
                                ],
                                inquirer.prompt([{
                                        type: "confirm",
                                        name: "again",
                                        message: "Would you like to purchase another?",
                                        default: "Yes"
                                    }])
                                    .then(function(moreItems) {
                                        if (moreItems.again == "Yes") {
                                            makePurchase();
                                        } else {
                                            console.log('See you later Alligator!!!');
                                            process.exit();
                                        }
                                    });
                            });
                    } else {
                        console.log('Insufficient Quantity, go around the kona!!!');
                        inquirer.prompt([{
                                type: "confirm",
                                name: "notagain",
                                message: "Try again?",
                                default: "No"
                            }])
                            .then(function(moreItems) {
                                if (moreItems.notagain == "Yes") {
                                    makePurchase();
                                } else {
                                    console.log('See you later Alligator!!!');
                                    process.exit();
                                }
                            });
                    }
                });
            });
    });
};