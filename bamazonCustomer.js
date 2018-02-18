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
                    var prodQuantity = result[selection.Start - 1].stock_quantity
                    var salesUpdate = +selection.Units * result[selection.Units - 1].price
                    console.log(salesUpdate);

                    if (selection.Units <= prodQuantity) {
                        var qtyupdate = prodQuantity - selection.Units;
                        connect.query(
                            "UPDATE products SET ? WHERE ?", [{
                                    stock_quantity: qtyupdate,
                                    product_sales: salesUpdate
                                },
                                {
                                    item_id: +selection.Start
                                }
                            ],
                            function(error) {
                                if (error) throw err;
                                console.log(`Transaction Complete!!! ${qtyupdate} left in stock.`);
                                inquirer.prompt([{
                                        type: "list",
                                        name: "again",
                                        message: "Would you like to purchase another?",
                                        choices: ["Yes", "No"],
                                        default: "Yes"
                                    }])
                                    .then(function(moreItems) {
                                        if (moreItems.again == "Yes") {
                                            getList();
                                        } else {
                                            proces.exit();
                                        }
                                    });
                            });
                    } else {
                        console.log('Insufficient Quantity, go around the kona!!!');
                        inquirer.prompt([{
                                type: "list",
                                name: "again",
                                message: "Would you like to purchase another?",
                                choices: ["Yes", "No"],
                                default: "No"
                            }])
                            .then(function(moreItems) {
                                if (moreItems.again = "Yes") {
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