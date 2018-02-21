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
            switch (supTools.supervisor) {
                case "View Product Sales by Department":
                    return viewProductSales();

                case "Create New Department":
                    return createDept();
            }
        })
    })
}

function viewProductSales() {
    connect.query("SELECT * FROM departments ", function(err, result) {
        if (err) throw err;
        console.table(result);
    })
}

function createDept() {
    {
        connect.query("SELECT * from departments", function(err, deptResult) {
            if (err) throw err;
            inquirer.prompt([{
                        name: "deptname",
                        type: "input",
                        message: "Enter the DEPARTMENT name"
                    },
                    {
                        name: "ohcosts",
                        type: "input",
                        message: "Enter the Operating Cost Amount"
                    },

                ])
                .then(function(addDept) {
                    connect.query(
                        "INSERT INTO departments SET ?", {
                            product_name: addDept.deptname,
                            over_head_costs: addDept.ohcosts,
                        },
                        function(error) {
                            if (err) throw err;
                            console.log("Product added successfully! \n");
                            createDept();
                        }
                    );
                });
        })
    }
}