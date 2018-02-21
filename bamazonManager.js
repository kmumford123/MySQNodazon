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
    mgrList();
});

function mgrList() {
    inquirer.prompt([{
        name: "invMgr",
        type: "list",
        message: "Choose from the list below?",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product",
            "exit"
        ]
    }])

    .then(function(mgrselection) {
        connect.query("SELECT * from products", function(err, result) {
            if (err) throw err;

            if (mgrselection.invMgr === "View Products for Sale") {
                connect.query(
                    "SELECT item_id, product_name, department_name, price, stock_quantity FROM products",
                    function(err, viewProducts) {
                        console.table(viewProducts);
                        mgrList();
                    });
            } else if (mgrselection.invMgr === "View Low Inventory") {
                connect.query(
                    "SELECT * FROM products where stock_quantity < 5",
                    function(err, lowInventory) {
                        console.table(lowInventory);
                        mgrList();
                    });
            } else if (mgrselection.invMgr === "Add to Inventory") {
                inquirer.prompt([{
                            name: "addInv",
                            type: "list",
                            message: "Enter your product ID?",
                            choices: function() {
                                return result.map((row) => `${row.item_id}`);
                            }
                        },
                        {
                            type: "input",
                            name: "Units",
                            message: "How many units would you like to add?"
                        }
                    ])
                    .then(function(inventoryAdd) {
                        var confirmAdd = result[inventoryAdd.addInv - 1].product_name;
                        var addQuantity = result[inventoryAdd.addInv - 1].stock_quantity + +inventoryAdd.Units;
                        connect.query(
                            "UPDATE products SET ? WHERE ?", [{
                                    stock_quantity: addQuantity
                                },
                                {
                                    item_id: +inventoryAdd.addInv
                                }
                            ],
                            function(err, result) {
                                if (err) throw err;
                                console.log(`${+inventoryAdd.addInv} ${confirmAdd} added to inventory! \n `);
                                mgrList();
                            }
                        );
                    });

            } else if (mgrselection.invMgr === "Add New Product") {
                connect.query("SELECT * from departments", function(err, deptResult) {
                    if (err) throw err;
                    inquirer.prompt([{
                                name: "prodname",
                                type: "input",
                                message: "Enter the PRODUCT name"
                            },
                            {
                                name: "deptname",
                                type: "list",
                                message: "Select your department",
                                choices: function() {
                                    return deptResult.map((row) => `${row.department_name}`);
                                }
                            },
                            {
                                name: "addprice",
                                type: "input",
                                message: "Enter the product PRICE"
                            },
                            {
                                name: "stock",
                                type: "input",
                                message: "Enter the QUANTITY"
                            }

                        ])
                        .then(function(addProduct) {
                            connect.query(
                                "INSERT INTO products SET ?", {
                                    product_name: addProduct.prodname,
                                    department_name: JSON.stringify(addProduct.deptname),
                                    price: +addProduct.addprice,
                                    stock_quantity: +addProduct.stock
                                },
                                function(error) {
                                    if (err) throw err;
                                    console.log("Product added successfully! \n");
                                    mgrList();
                                }
                            );
                        });
                })
            } else {
                console.log('See you later Alligator!!!');
                process.exit();

            }
        })
    })

};