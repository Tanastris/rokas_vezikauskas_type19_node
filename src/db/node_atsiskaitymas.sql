-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 10, 2024 at 07:13 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `node_atsiskaitymas`
--

-- --------------------------------------------------------

--
-- Table structure for table `item_types`
--

CREATE TABLE `item_types` (
  `item_type_id` int(11) NOT NULL,
  `item_type_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `item_types`
--

INSERT INTO `item_types` (`item_type_id`, `item_type_name`) VALUES
(1, 'food'),
(2, 'drink'),
(3, 'electronic'),
(4, 'clothes');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `shop_item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `shop_item_id`, `quantity`, `total_price`, `status`) VALUES
(1, 2, 4, 3, 19.99, 'ready to ship'),
(2, 2, 4, 3, 19.99, 'ready to ship'),
(3, 2, 4, 3, 19.99, 'ready to ship'),
(4, 4, 6, 3, 19.99, 'ready to ship'),
(5, 4, 6, 3, 19.99, 'ready to ship'),
(6, 2, 8, 1, 29.99, 'pending'),
(7, 1, 3, 2, 39.98, 'processing'),
(8, 3, 5, 4, 79.96, 'shipped'),
(9, 5, 1, 1, 9.99, 'completed'),
(10, 4, 7, 2, 39.98, 'processing'),
(11, 2, 10, 3, 59.97, 'ready to ship'),
(12, 1, 4, 1, 49.99, 'shipped'),
(13, 3, 9, 2, 99.98, 'completed'),
(14, 5, 2, 1, 14.99, 'pending'),
(15, 1, 4, 1, 79.99, 'ready to ship'),
(16, 1, 4, 1, 79.99, 'ready to ship'),
(17, 1, 4, 1, 79.99, 'ready to ship'),
(18, 1, 5, 1, 59.99, 'ready to ship'),
(19, 1, 4, 1, 79.99, 'ready to ship');

-- --------------------------------------------------------

--
-- Table structure for table `shop_items`
--

CREATE TABLE `shop_items` (
  `shop_item_id` int(10) UNSIGNED NOT NULL,
  `shop_item_name` varchar(255) NOT NULL,
  `shop_item_price` decimal(10,2) NOT NULL,
  `shop_item_description` text NOT NULL,
  `shop_item_image` varchar(1000) NOT NULL,
  `item_type_id` int(11) NOT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shop_items`
--

INSERT INTO `shop_items` (`shop_item_id`, `shop_item_name`, `shop_item_price`, `shop_item_description`, `shop_item_image`, `item_type_id`, `isDeleted`) VALUES
(1, 'Example Item', 19.99, 'This is an example item', 'example.jpg', 1, 1),
(2, 'Example Item', 19.99, 'This is an example item', 'example.jpg', 1, 1),
(3, 'Summer Floral Dress', 49.99, 'Elegant floral dress perfect for summer occasions.', 'floral_dress.jpg', 1, 1),
(4, 'Classic Leather Handbag', 79.99, 'Timeless leather handbag with spacious compartments.', 'leather_handbag.jpg', 2, 1),
(5, 'Mens Casual Sneakers', 59.99, 'Comfortable and stylish sneakers for everyday wear.', 'sneakers.jpg', 3, 1),
(6, 'Vintage Pocket Watch', 29.99, 'Exquisite vintage pocket watch with intricate details.', 'pocket_watch.jpg', 1, 0),
(7, 'Cozy Knit Sweater', 39.99, 'Soft and warm knit sweater for chilly evenings.', 'knit_sweater.jpg', 2, 0),
(8, 'Smartphone Stand Dock', 19.99, 'Sleek and functional dock for your smartphone.', 'phone_stand.jpg', 3, 0),
(9, 'Gourmet Coffee Beans', 14.99, 'Premium coffee beans for the perfect morning brew.', 'coffee_beans.jpg', 1, 0),
(10, 'Professional Chefs Knife', 89.99, 'High-quality chefs knife for precision cutting.', 'chef_knife.jpg', 2, 0),
(11, 'Designer Sunglasses', 69.99, 'Fashionable sunglasses for a trendy look.', 'sunglasses.jpg', 3, 0),
(12, 'Artistic Canvas Print', 49.99, 'Beautiful canvas print to enhance your home decor.', 'canvas_print.jpg', 1, 0),
(13, 'Rokas Vezikauskas', 25.00, '45234252', '424524', 2, 1),
(14, 'dasd', 25.00, '4245245', '2452', 1, 1),
(15, 'asddas', 14.00, 'fasddAS', 'ASDASDAS', 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_email`, `user_password`, `role_id`) VALUES
(1, 'John Doe', 'johndoe@example.com', 'password123', 1),
(2, 'Jane Smith', 'janesmith@example.com', 'password456', 1),
(3, 'Alice Johnson', 'alice@example.com', 'password1', 1),
(4, 'Bob Smith', 'bob@example.com', 'password2', 2),
(5, 'Charlie Davis', 'charlie@example.com', 'password3', 3),
(6, 'David Miller', 'david@example.com', 'password4', 1),
(7, 'Eva Martinez', 'eva@example.com', 'password5', 2),
(8, 'Frank Robinson', 'frank@example.com', 'password6', 3),
(9, 'Grace White', 'grace@example.com', 'password7', 1),
(10, 'Harry Lee', 'harry@example.com', 'password8', 2),
(11, 'Ivy Taylor', 'ivy@example.com', 'password9', 3),
(12, 'Jack Anderson', 'jack@example.com', 'password10', 1),
(13, 'Katie Brown', 'katie@example.com', 'password11', 2),
(14, 'Leo Garcia', 'leo@example.com', 'password12', 3),
(15, 'Mia Wright', 'mia@example.com', 'password13', 1),
(16, 'Noah Davis', 'noah@example.com', 'password14', 2),
(17, 'Olivia Turner', 'olivia@example.com', 'password15', 3),
(19, 'Rokas Vezikauskas', 'janesmitha@example.com', 'asdf', 1),
(20, 'Rokas Vezikauskas', 'janesmaith@example.com', 'VIENAS', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `user_role_id` int(10) UNSIGNED NOT NULL,
  `user_role_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`user_role_id`, `user_role_name`) VALUES
(1, 'admin'),
(2, 'user'),
(3, 'guest');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `item_types`
--
ALTER TABLE `item_types`
  ADD PRIMARY KEY (`item_type_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `shop_items`
--
ALTER TABLE `shop_items`
  ADD PRIMARY KEY (`shop_item_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_email` (`user_email`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`user_role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `item_types`
--
ALTER TABLE `item_types`
  MODIFY `item_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `shop_items`
--
ALTER TABLE `shop_items`
  MODIFY `shop_item_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `user_role_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
