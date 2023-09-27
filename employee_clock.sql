-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 27, 2023 at 07:00 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `employee_clock`
--

-- --------------------------------------------------------

--
-- Table structure for table `employee_id`
--

CREATE TABLE `employee_id` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `employee_id`
--

INSERT INTO `employee_id` (`id`, `first_name`, `last_name`) VALUES
(7, 'tom', 'slaber'),
(8, 'john', 'cena'),
(9, 'guy', 'yogev'),
(15, 'yoram', 'moshe'),
(16, 'elad', 'levi'),
(18, 'hello', 'world'),
(20, 'donald', 'duck'),
(23, 'bob', 'marley'),
(27, 'frank ', 'sinatra');

-- --------------------------------------------------------

--
-- Table structure for table `time_stamps`
--

CREATE TABLE `time_stamps` (
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `employee_id` int(11) NOT NULL,
  `enter_time` time DEFAULT NULL,
  `exit_time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `time_stamps`
--

INSERT INTO `time_stamps` (`date`, `employee_id`, `enter_time`, `exit_time`) VALUES
('2023-09-27 15:06:32', 7, '18:05:32', '18:06:32'),
('2023-09-27 15:06:34', 8, '18:05:35', '18:06:34'),
('2023-09-27 15:06:35', 9, '18:05:36', '18:06:35'),
('2023-09-27 15:06:36', 15, '18:05:38', '18:06:36'),
('2023-09-27 15:06:37', 16, '18:05:39', '18:06:37'),
('2023-09-27 15:06:37', 16, '18:05:41', '18:06:37'),
('2023-09-27 15:06:39', 18, '18:05:42', '18:06:39'),
('2023-09-27 15:06:17', 20, '18:05:43', '18:06:17'),
('2023-09-27 15:06:17', 20, '18:06:08', '18:06:17'),
('2023-09-27 15:14:47', 20, '18:14:45', '18:14:47'),
('2023-09-27 15:15:02', 8, '18:14:55', '18:15:02'),
('2023-09-27 15:18:26', 23, '18:18:24', '18:18:26'),
('2023-09-27 15:40:42', 23, '18:40:42', '18:40:42'),
('2023-09-27 16:42:31', 27, '19:42:31', '19:42:31'),
('2023-09-27 16:43:53', 23, '19:43:53', '19:43:53'),
('2023-09-27 16:53:20', 20, '19:53:18', '19:53:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employee_id`
--
ALTER TABLE `employee_id`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employee_id`
--
ALTER TABLE `employee_id`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
