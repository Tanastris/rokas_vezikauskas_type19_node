-- Create users table
CREATE TABLE `node_atsiskaitymas`.`users` (
  `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `user_name` VARCHAR(255) NOT NULL ,
  `user_email` VARCHAR(255) NOT NULL , 
  `user_password` VARCHAR(255) NOT NULL , 
  `role_id` INT NOT NULL , 
  PRIMARY KEY (`user_id`)
  ) ENGINE = InnoDB;

--  Create shop item table
CREATE TABLE `node_atsiskaitymas`.`shop_item` (
    `shop_item_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `shop_item_name` VARCHAR(255) NOT NULL,
    `shop_item_price` DECIMAL(10,2) NOT NULL,
    `shop_item_description` TEXT NOT NULL,
    `shop_item_image` VARCHAR(1000) NOT NULL,
    `item_type_id` INT(11) NOT NULL,
    PRIMARY KEY (`shop_item_id`)
) ENGINE = InnoDB;


--  Create item type table
CREATE TABLE `node_atsiskaitymas`.`item_types` (
  `item_type_id` INT UNSIGNED NOT NULL AUTO_INCREMENT , 
  `item_type_name` VARCHAR(255) NOT NULL , 
  PRIMARY KEY (`item_type_id`)
  ) ENGINE = InnoDB;

  -- Create order table
  CREATE TABLE `node_atsiskaitymas`.`orders` (
    `order_id` INT UNSIGNED NOT NULL AUTO_INCREMENT , 
    `user_id` INT NOT NULL , 
    `shop_item_id` INT NOT NULL , 
    `quantity` INT NOT NULL , 
    `total_price` DECIMAL(10,2) NOT NULL ,
    `status` VARCHAR(255) NOT NULL , 
    PRIMARY KEY (`order_id`)
    ) ENGINE = InnoDB;

    -- Create role table
    CREATE TABLE `node_atsiskaitymas`.`user_roles` (
      `user_role_id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
      `user_role_name` VARCHAR(255) NOT NULL , 
      PRIMARY KEY (`user_role_id`)
      ) ENGINE = InnoDB;

  -- SQL Query to create 15 users
INSERT INTO users (user_name, user_email, user_password, role_id)
VALUES 
  ('Alice Johnson', 'alice@example.com', 'password1', 1),
  ('Bob Smith', 'bob@example.com', 'password2', 2),
  ('Charlie Davis', 'charlie@example.com', 'password3', 3),
  ('David Miller', 'david@example.com', 'password4', 1),
  ('Eva Martinez', 'eva@example.com', 'password5', 2),
  ('Frank Robinson', 'frank@example.com', 'password6', 3),
  ('Grace White', 'grace@example.com', 'password7', 1),
  ('Harry Lee', 'harry@example.com', 'password8', 2),
  ('Ivy Taylor', 'ivy@example.com', 'password9', 3),
  ('Jack Anderson', 'jack@example.com', 'password10', 1),
  ('Katie Brown', 'katie@example.com', 'password11', 2),
  ('Leo Garcia', 'leo@example.com', 'password12', 3),
  ('Mia Wright', 'mia@example.com', 'password13', 1),
  ('Noah Davis', 'noah@example.com', 'password14', 2),
  ('Olivia Turner', 'olivia@example.com', 'password15', 3);

  -- SQL Query to create 10 items
  INSERT INTO shop_items (shop_item_name, shop_item_price, shop_item_description, shop_item_image, item_type_id)
VALUES 
  ('Summer Floral Dress', 49.99, 'Elegant floral dress perfect for summer occasions.', 'floral_dress.jpg', 1),
  ('Classic Leather Handbag', 79.99, 'Timeless leather handbag with spacious compartments.', 'leather_handbag.jpg', 2),
  ('Mens Casual Sneakers', 59.99, 'Comfortable and stylish sneakers for everyday wear.', 'sneakers.jpg', 3),
  ('Vintage Pocket Watch', 29.99, 'Exquisite vintage pocket watch with intricate details.', 'pocket_watch.jpg', 1),
  ('Cozy Knit Sweater', 39.99, 'Soft and warm knit sweater for chilly evenings.', 'knit_sweater.jpg', 2),
  ('Smartphone Stand Dock', 19.99, 'Sleek and functional dock for your smartphone.', 'phone_stand.jpg', 3),
  ('Gourmet Coffee Beans', 14.99, 'Premium coffee beans for the perfect morning brew.', 'coffee_beans.jpg', 1),
  ('Professional Chefs Knife', 89.99, 'High-quality chefs knife for precision cutting.', 'chef_knife.jpg', 2),
  ('Designer Sunglasses', 69.99, 'Fashionable sunglasses for a trendy look.', 'sunglasses.jpg', 3),
  ('Artistic Canvas Print', 49.99, 'Beautiful canvas print to enhance your home decor.', 'canvas_print.jpg', 1);


  -- SQL Query to create 4 item types
  INSERT INTO `item_types` 
  (`item_type_id`, `item_type_name`)
   VALUES 
   ('1', 'food'), 
   ('2', 'drink'), 
   ('3', 'electronic'), 
   ('4', 'clothes')

  -- Create 10 orders
 INSERT INTO orders (user_id, shop_item_id, quantity, total_price, status)
VALUES 
  (4, 6, 3, 19.99, 'ready to ship'),
  (2, 8, 1, 29.99, 'pending'),
  (1, 3, 2, 39.98, 'processing'),
  (3, 5, 4, 79.96, 'shipped'),
  (5, 1, 1, 9.99, 'completed'),
  (4, 7, 2, 39.98, 'processing'),
  (2, 10, 3, 59.97, 'ready to ship'),
  (1, 4, 1, 49.99, 'shipped'),
  (3, 9, 2, 99.98, 'completed'),
  (5, 2, 1, 14.99, 'pending');
