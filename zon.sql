DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
   item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
   product_name VARCHAR( 29),
   department_name VARCHAR (60),
   price DECIMAL (5,2),
   stock_quantity INTEGER (10),
   PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rocket Skooter", "Sports & Outdoors", 10.99, 80),
("Krull Skateboard", "Sports & Outdoors", 77.99, 25),
("HDMI Cable", "Electronic Accessories", 3.99, 200),
("Cane Colter Jersey", "Clothing, Shoes & Jewelry", 99.99, 12),
("Catcher in the Rye", "Books & Audible", 6.99, 4),
("Crock Pot", "Home, Garden, Pets & Tools", 80.99, 12),
("Echo (2nd Generation)", "Electronics, Computers & Office", 100.99, 77),
("Suit", "Clothing, Shoes & Jewelry", 4.99, 235),
("Towels", "Home, Garden, Pets & Tools", 25.99, 95),
("Kleenex Hand Towels", "Health & Household", 13.44, 3000);

SELECT * FROM products where stock_quantity < 5;

create table departments (
department_id integer (10) auto_increment not null,
department_name varchar(250),
over_head_costs decimal(10,2),
total_profit decimal(10,2),
primary key (department_id)
);



;WITH sums AS 
(
   SELECT
      over_head_costs, product_sales, 
      SUM(over_head_costs) + SUM(product_sales) as Total,
      SUM(over_head_costs) + SUM(product_sales) as Total1 
   FROM
      dbo.stud 
   GROUP BY
      over_head_costs, product_sales
)
SELECT 
   over_head_costs, product_sales, 
   total, total1, 
   total+total1 AS 'total_profit' 
FROM 
   sums;