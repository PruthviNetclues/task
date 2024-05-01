-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 01, 2024 at 06:40 AM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `task_manager`
--

-- --------------------------------------------------------

--
-- Table structure for table `priorities`
--

DROP TABLE IF EXISTS `priorities`;
CREATE TABLE IF NOT EXISTS `priorities` (
  `priority_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `priority_name` varchar(255) NOT NULL,
  PRIMARY KEY (`priority_id`),
  UNIQUE KEY `priority_id` (`priority_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `priorities`
--

INSERT INTO `priorities` (`priority_id`, `priority_name`) VALUES
(1, 'Low'),
(2, 'Medium'),
(3, 'High');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `roleName` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`role_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `roleName`, `user_id`) VALUES
(9, 'assigner', 15),
(10, 'assigner', 1),
(11, 'assignee', 2),
(12, 'assigner', 3),
(13, 'assignee', 4);

-- --------------------------------------------------------

--
-- Table structure for table `statuses`
--

DROP TABLE IF EXISTS `statuses`;
CREATE TABLE IF NOT EXISTS `statuses` (
  `status_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `status_name` varchar(255) NOT NULL,
  PRIMARY KEY (`status_id`),
  UNIQUE KEY `status_id` (`status_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `statuses`
--

INSERT INTO `statuses` (`status_id`, `status_name`) VALUES
(1, 'Upcoming'),
(2, 'InProgress'),
(3, 'InTesting'),
(4, 'Completed');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
CREATE TABLE IF NOT EXISTS `tasks` (
  `task_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `assignee_id` int DEFAULT NULL,
  `priority_id` int DEFAULT NULL,
  `status_id` int DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `execution_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `assigned_by_id` int DEFAULT NULL,
  PRIMARY KEY (`task_id`),
  UNIQUE KEY `task_id` (`task_id`),
  KEY `fk_assigned_by` (`assigned_by_id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `userRole` enum('Assigner','Assignee') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `profilePic` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `Name`, `email`, `password`, `userRole`, `profilePic`) VALUES
(1, 'Pruthvi', 'pchauhan@gmail.com', '$2b$10$fX0dgGEcCLdxWWjnFznlIuvvupD1ZRswqUDwnbI8wFo2bUqk7AnmK', 'Assigner', 'd4385eb1eb29ac36-Capture.PNG'),
(2, 'Keval', 'kdave@gmail.com', '$2b$10$cjz8rSljrn5bqXoe3/i4U./CIox2rLKAP.Moe90HXsncxrMZ/imp2', 'Assignee', '82e01afe19477cf0-Capture.PNG'),
(3, 'Hinal', 'hinal@gmail.com', '$2b$10$CtNjaaDxsn/caOM2q7YweeUWIbhI6Y9R5z4mn2wbUwQpLnQQmdvai', 'Assigner', 'f341520557a3dccc-Capture.PNG'),
(4, 'Kunal', 'kunal@gmail.com', '$2b$10$hVJ4xF1v7aRxHjBN2PMGPeA1.H9CNCibm7JP.UeVeKw529RNyIMma', 'Assignee', 'd9d5d90de60be562-Capture.PNG');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `roles`
--
ALTER TABLE `roles`
  ADD CONSTRAINT `roles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
