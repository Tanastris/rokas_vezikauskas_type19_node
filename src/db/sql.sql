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