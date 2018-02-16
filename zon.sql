DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
   item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
   product_name VARCHAR( 29),
   department_name VARCHAR (30),
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

CREATE TABLE department (
    dep_id INT(10), AUTO_INCREMENT NOT NULL,
    department_name VARCHAR (45),
    over_head_costs INT (10)
)


