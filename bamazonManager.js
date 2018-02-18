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
    mgrList();
});

function mgrList() {
    connect.query("SELECT * from products", function(err, result) {

        inquirer.prompt([{
            name: "Start",
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

                if (mgrselection.Start === "View Products for Sale") {
                    console.log(result);
                    mgrList();
                } else if (mgrselection.Start === "View Low Inventory") {
                    connect.query(
                        "SELECT * FROM products where stock_quantity < 5",
                        function(err, lowInventory) {
                            console.log(lowInventory);
                            mgrList();
                        });
                } else if (mgrselection.Start === "Add to Inventory") {
                    connect.query(
                        "SHOW TABLES",
                        function(err, result) {
                            if (err) throw err;
                            console.log(result);
                            console.log("Check out this young table");
                        }
                    );

                } else if (mgrselection.Start === "Add New Product") {
                    inquirer.prompt([{
                                name: "prodname",
                                type: "input",
                                message: "Enter the PRODUCT name"
                            },
                            {
                                name: "deptname",
                                type: "input",
                                message: "Enter the DEPARTMENT name"
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
                                    department_name: addProduct.deptname,
                                    price: +addProduct.addprice,
                                    stock_quantity: +addProduct.stock
                                },
                                function(error) {
                                    if (err) throw err;
                                    console.log("Product added successfully!");
                                }
                            );
                        });

                } else {
                    console.log('See you later');
                    process.exit();

                }
            })
        })
    });
};