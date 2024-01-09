-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 09, 2024 at 03:13 PM
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
-- Database: `exam`
--

-- --------------------------------------------------------

--
-- Table structure for table `itemtypes`
--

CREATE TABLE `itemtypes` (
  `typesId` int(10) UNSIGNED NOT NULL,
  `typesName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `itemtypes`
--

INSERT INTO `itemtypes` (`typesId`, `typesName`) VALUES
(1, 'drinks'),
(2, 'food'),
(3, 'phones'),
(4, 'garden trolls');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderId` int(10) UNSIGNED NOT NULL,
  `userId` int(11) NOT NULL,
  `shopItemId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `totalPrice` decimal(11,2) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderId`, `userId`, `shopItemId`, `quantity`, `totalPrice`, `status`) VALUES
(20, 5, 3, 2, 5.98, 'ready to deliver'),
(21, 10, 3, 2, 5.98, 'ready to deliver'),
(22, 10, 3, 2, 5.98, 'ready to deliver'),
(23, 10, 3, 2, 5.98, 'ready to deliver'),
(24, 5, 3, 2, 5.98, 'ready to deliver'),
(25, 5, 2, 3, 8.97, 'ready to deliver'),
(26, 1, 1, 2, 5.98, 'Order Placed'),
(27, 2, 1, 3, 8.97, 'Order Placed'),
(28, 0, 2, 1, 2.99, 'Order Placed'),
(29, 0, 2, 1, 2.99, 'Order Placed'),
(30, 0, 2, 1, 2.99, 'Order Placed'),
(31, 0, 2, 1, 2.99, 'Order Placed'),
(32, 0, 2, 1, 2.99, 'Order Placed'),
(33, 0, 2, 1, 2.99, 'Order Placed'),
(34, 0, 2, 1, 2.99, 'Order Placed'),
(35, 0, 2, 1, 2.99, 'Order Placed'),
(36, 0, 2, 1, 2.99, 'Order Placed'),
(37, 0, 2, 1, 2.99, 'Order Placed'),
(38, 0, 2, 1, 2.99, 'Order Placed'),
(39, 0, 2, 1, 2.99, 'Order Placed'),
(40, 0, 2, 1, 2.99, 'Order Placed'),
(41, 0, 2, 1, 2.99, 'Order Placed'),
(42, 0, 2, 1, 2.99, 'Order Placed'),
(43, 0, 2, 1, 2.99, 'Order Placed'),
(44, 0, 2, 1, 2.99, 'Order Placed'),
(45, 0, 2, 1, 2.99, 'Order Placed'),
(46, 0, 2, 1, 2.99, 'Order Placed');

-- --------------------------------------------------------

--
-- Table structure for table `shopitems`
--

CREATE TABLE `shopitems` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `itemTypeId` int(11) NOT NULL,
  `isDeleted` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shopitems`
--

INSERT INTO `shopitems` (`id`, `name`, `price`, `description`, `image`, `itemTypeId`, `isDeleted`) VALUES
(1, 'koka kola', 2.99, 'gaivusis gerimas', 'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_480,q_auto,w_480/d_ecommerce:backend-fallback.png/MAT_1353351_PCE_LT', 1, 0),
(2, 'fanta', 2.99, 'gaivusis gerimas', 'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_480,q_auto,w_480/d_ecommerce:backend-fallback.png/MAT_1354572_PCE_LT', 1, 0),
(3, 'Sprite', 2.99, 'gaivusis gerimas', 'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_480,q_auto,w_480/d_ecommerce:backend-fallback.png/MAT_1367096_PCE_LT', 1, 0),
(6, 'Sprite', 2.99, 'gaivusis gerimas', 'https://rimibaltic-res.cloudinary.com/image/upload/b_white,c_fit,f_auto,h_480,q_auto,w_480/d_ecommerce:backend-fallback.png/MAT_1367096_PCE_LT', 1, 1),
(7, 'test', 11.00, 'testestest', 'testests', 2, 1),
(8, 'james', 11.00, 'etsetset', 'etstset', 2, 1),
(9, 'test', 12.00, 'Luzusi koja', 'asdfasdfasdf', 3, 1),
(10, 'test', 11.00, 'kazkas atsitiko', '123213213', 2, 1),
(11, 'Hot Dog', 1.96, 'A nice steaming hot dog', 'https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQswQI5UwdtTnEoxqSMZWqa_fon9r60coOYMczmKwFI2xX4IVK2ieclMOiC3Rx1PA0i', 2, 0),
(12, 'Nokia 3310', 999.00, 'the new legend returns nokia 3310', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Nokia_3310_Blue_R7309170_%28retouch%29.jpg/150px-Nokia_3310_Blue_R7309170_%28retouch%29.jpg', 3, 0),
(13, 'nice gnome', 13.99, 'a nice troll to look after your garden', 'https://www.varle.lt/static/uploads/products/1527/gar/garden-gnome-height-21-cm_VaELmv4.jpg', 4, 0);

-- --------------------------------------------------------

--
-- Table structure for table `userroles`
--

CREATE TABLE `userroles` (
  `roleId` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userroles`
--

INSERT INTO `userroles` (`roleId`, `name`) VALUES
(1, 'admin'),
(2, 'user'),
(3, 'guest');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(10) UNSIGNED NOT NULL,
  `userName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `userName`, `email`, `password`, `roleId`) VALUES
(1, 'admin', 'admin@dev.com', '123', 1),
(2, 'vartotojas1', 'vartotojas1@metal.com', 'secret1', 2),
(3, 'vartotojas2', 'vartotojas2@metal.com', 'secret2', 2),
(4, 'vartotojas3', 'vartotojas3@metal.com', 'secret3', 2),
(5, 'vartotojas4', 'vartotojas4@metal.com', 'secret4', 2),
(6, 'vartotojas6', 'vartotojas6@metal.com', 'secret6', 2),
(7, 'Dovydas', 'dovydas@metal.com', '123456789A', 2),
(8, 'Dovydas', 'dovydas@dev.com', '12345', 2),
(9, 'vartotojas7', 'vartotojas7@metal.com', 'secret7', 2),
(10, 'Dovydas', 'admin1@dev.com', '1231', 2),
(11, 'webTest', 'web@test.com', '12345', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `itemtypes`
--
ALTER TABLE `itemtypes`
  ADD PRIMARY KEY (`typesId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderId`);

--
-- Indexes for table `shopitems`
--
ALTER TABLE `shopitems`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userroles`
--
ALTER TABLE `userroles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `itemtypes`
--
ALTER TABLE `itemtypes`
  MODIFY `typesId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `shopitems`
--
ALTER TABLE `shopitems`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `userroles`
--
ALTER TABLE `userroles`
  MODIFY `roleId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
