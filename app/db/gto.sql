-- phpMyAdmin SQL Dump
-- version 3.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 02, 2017 at 07:36 AM
-- Server version: 5.5.25a
-- PHP Version: 5.4.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `gto`
--

-- --------------------------------------------------------

--
-- Table structure for table `client_master`
--

CREATE TABLE IF NOT EXISTS `client_master` (
  `client_id` int(11) NOT NULL AUTO_INCREMENT,
  `client_name` varchar(100) NOT NULL,
  `address` varchar(500) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(30) DEFAULT NULL,
  `contact_no` varchar(15) DEFAULT NULL,
  `contact_person` varchar(50) DEFAULT NULL,
  `vat_no` varchar(50) DEFAULT NULL,
  `client_status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`client_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `product_master`
--

CREATE TABLE IF NOT EXISTS `product_master` (
  `prod_id` int(11) NOT NULL AUTO_INCREMENT,
  `prod_name` varchar(50) NOT NULL,
  PRIMARY KEY (`prod_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `product_master`
--

INSERT INTO `product_master` (`prod_id`, `prod_name`) VALUES
(1, 'Filler Powder'),
(2, 'Raw Organic Manure'),
(3, 'Slaughter House Waste'),
(4, 'Animal Waste Filler'),
(5, 'HDPE Bags'),
(6, 'Echomeal');

-- --------------------------------------------------------

--
-- Table structure for table `purchase_master`
--

CREATE TABLE IF NOT EXISTS `purchase_master` (
  `purchase_id` int(11) NOT NULL AUTO_INCREMENT,
  `supplier_id` varchar(11) DEFAULT NULL,
  `purchase_date` varchar(20) DEFAULT NULL,
  `bill_date` varchar(20) DEFAULT NULL,
  `bill_no` varchar(30) DEFAULT NULL,
  `lorry_no` varchar(15) DEFAULT NULL,
  `weight` varchar(10) DEFAULT NULL,
  `rate` varchar(20) DEFAULT NULL,
  `lorryfreight` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`purchase_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `purchase_master`
--

INSERT INTO `purchase_master` (`purchase_id`, `supplier_id`, `purchase_date`, `bill_date`, `bill_no`, `lorry_no`, `weight`, `rate`, `lorryfreight`) VALUES
(4, '8', '1501871400000', '1502303400000', 'B1212', 'MH 12 LL 2803', '20', '500', '0'),
(5, '9', '1501698600000', '1504117800000', '02', 'MH 12 AA 2320', '50', '20', '0');

-- --------------------------------------------------------

--
-- Table structure for table `supplier_master`
--

CREATE TABLE IF NOT EXISTS `supplier_master` (
  `supplier_id` int(10) NOT NULL AUTO_INCREMENT,
  `supplier_name` varchar(50) DEFAULT NULL,
  `vat` varchar(20) DEFAULT NULL,
  `prod_id` varchar(50) DEFAULT NULL,
  `contact_person` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `contactno` varchar(20) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `supplier_status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`supplier_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `supplier_master`
--

INSERT INTO `supplier_master` (`supplier_id`, `supplier_name`, `vat`, `prod_id`, `contact_person`, `city`, `contactno`, `address`, `supplier_status`) VALUES
(8, 'Wasim', 'asdasd', '3', 'adasd', 'adad', 'adad', 'asdasdad', 'active'),
(9, 'Avees', 'asdsda', '2', 'adad', 'asdasd', 'asdasd', 'adasda', 'active'),
(10, 'Meezan', 'V2323', '2', 'Bokud', 'Miraj', '8237402054', 'Khasai galli Miraj', 'active'),
(11, 'Test', 'V1212', '4', 'Test', 'test', '1212', 'test add', 'active'),
(12, 'demo', 'ad', '2', 'test', 'ajara', '123123', 'demo add', 'active');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
