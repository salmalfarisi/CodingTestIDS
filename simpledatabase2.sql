-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 14, 2022 at 10:26 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `simpledatabase2`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(10) UNSIGNED NOT NULL,
  `customerName` varchar(255) NOT NULL,
  `createOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `editOn` timestamp NULL DEFAULT current_timestamp(),
  `deleteOn` timestamp NULL DEFAULT current_timestamp(),
  `createBy` varchar(255) DEFAULT NULL,
  `editBy` varchar(255) DEFAULT NULL,
  `deleteBY` varchar(255) DEFAULT NULL,
  `delete_status` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `customerName`, `createOn`, `editOn`, `deleteOn`, `createBy`, `editBy`, `deleteBY`, `delete_status`) VALUES
(1, 'customer1', '2022-12-14 17:00:00', '2022-12-14 21:25:37', '2022-12-14 21:25:37', NULL, NULL, NULL, 0),
(2, 'customer2', '2022-12-14 17:00:00', '2022-12-14 21:25:37', '2022-12-14 21:25:37', NULL, NULL, NULL, 0),
(3, 'customer3', '2022-12-14 17:00:00', '2022-12-14 21:25:37', '2022-12-14 21:25:37', NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL,
  `ProductName` varchar(255) NOT NULL,
  `createOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `editOn` timestamp NULL DEFAULT current_timestamp(),
  `deleteOn` timestamp NULL DEFAULT current_timestamp(),
  `createBy` varchar(255) DEFAULT NULL,
  `editBy` varchar(255) DEFAULT NULL,
  `deleteBY` varchar(255) DEFAULT NULL,
  `delete_status` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `ProductName`, `createOn`, `editOn`, `deleteOn`, `createBy`, `editBy`, `deleteBY`, `delete_status`) VALUES
(1, 'product1', '2022-12-14 17:00:00', '2022-12-14 21:25:36', '2022-12-14 21:25:36', NULL, NULL, NULL, 0),
(2, 'product2', '2022-12-14 17:00:00', '2022-12-14 21:25:36', '2022-12-14 21:25:36', NULL, NULL, NULL, 0),
(3, 'product3', '2022-12-14 17:00:00', '2022-12-14 21:25:36', '2022-12-14 21:25:36', NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(10) UNSIGNED NOT NULL,
  `productID` int(10) UNSIGNED DEFAULT NULL,
  `customerID` int(10) UNSIGNED DEFAULT NULL,
  `transactionDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `amount` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `createOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `editOn` timestamp NULL DEFAULT current_timestamp(),
  `deleteOn` timestamp NULL DEFAULT current_timestamp(),
  `createBy` varchar(255) DEFAULT NULL,
  `editBy` varchar(255) DEFAULT NULL,
  `deleteBY` varchar(255) DEFAULT NULL,
  `delete_status` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `editOn` timestamp NULL DEFAULT current_timestamp(),
  `deleteOn` timestamp NULL DEFAULT current_timestamp(),
  `createBy` varchar(255) DEFAULT NULL,
  `editBy` varchar(255) DEFAULT NULL,
  `deleteBY` varchar(255) DEFAULT NULL,
  `delete_status` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `email`, `password`, `createOn`, `editOn`, `deleteOn`, `createBy`, `editBy`, `deleteBY`, `delete_status`) VALUES
(1, 'akun1', 'akun1', 'akun1@email.com', '$2b$10$CILG/RqbtO1nfPImQK3iyO5V.GuYxpS0Cz7LI3xLJm09ldJdPGggC', '2022-12-14 17:00:00', '2022-12-14 21:25:36', '2022-12-14 21:25:36', NULL, NULL, NULL, 0),
(2, 'akun2', 'akun2', 'akun2@email.com', '$2b$10$ze07rtFI2Rcm1C3CbNUD2uQfmY0cHlxwCXMZ7fsZrM8HXilOWsstK', '2022-12-14 17:00:00', '2022-12-14 21:25:36', '2022-12-14 21:25:36', NULL, NULL, NULL, 0),
(3, 'akun3', 'akun3', 'akun3@email.com', '$2b$10$nrMGUQYLxMdq2I0.n78rT.d.Otd6ZCYB/Ni/Dbm9NbRNKNjwNtdJy', '2022-12-14 17:00:00', '2022-12-14 21:25:36', '2022-12-14 21:25:36', NULL, NULL, NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productID` (`productID`),
  ADD KEY `customerID` (`customerID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`customerID`) REFERENCES `customers` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
