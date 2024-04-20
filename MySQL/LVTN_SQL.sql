-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 100.107.140.31    Database: 3_sql
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `3_sql`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `3_sql` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_bin */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `3_sql`;

--
-- Table structure for table `sql_alarm`
--

DROP TABLE IF EXISTS `sql_alarm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sql_alarm` (
  `Date` datetime NOT NULL,
  `ID` int DEFAULT NULL,
  `Status` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `Alarm Name` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sql_alarm`
--

LOCK TABLES `sql_alarm` WRITE;
/*!40000 ALTER TABLE `sql_alarm` DISABLE KEYS */;
INSERT INTO `sql_alarm` VALUES ('2024-04-09 00:55:57',1,'IO','Valve 1 Error'),('2024-04-09 00:55:57',2,'IO','Valve 2 Error'),('2024-04-09 00:55:57',3,'IO','Valve 3 Error'),('2024-04-09 00:55:57',4,'IO','Mix DC Error'),('2024-04-09 00:55:57',5,'IO','Export Error'),('2024-04-10 00:54:12',1,'IO','Valve 1 Error'),('2024-04-10 00:54:12',2,'IO','Valve 2 Error'),('2024-04-10 00:54:12',3,'IO','Valve 3 Error'),('2024-04-10 00:54:12',4,'IO','Mix DC Error'),('2024-04-10 00:54:12',5,'IO','Export Error'),('2024-04-10 01:21:29',1,'IO','Valve 1 Error'),('2024-04-10 01:21:29',2,'IO','Valve 2 Error'),('2024-04-10 01:21:29',3,'IO','Valve 3 Error'),('2024-04-10 01:21:29',4,'IO','Mix DC Error'),('2024-04-10 01:21:29',5,'IO','Export Error'),('2024-04-10 01:31:21',1,'IO','Valve 1 Error'),('2024-04-10 01:31:21',2,'IO','Valve 2 Error'),('2024-04-10 01:31:21',3,'IO','Valve 3 Error'),('2024-04-10 01:31:21',4,'IO','Mix DC Error'),('2024-04-10 01:31:21',5,'IO','Export Error'),('2024-04-10 01:32:35',1,'IO','Valve 1 Error'),('2024-04-10 01:32:35',2,'IO','Valve 2 Error'),('2024-04-10 01:32:35',3,'IO','Valve 3 Error'),('2024-04-10 01:32:35',4,'IO','Mix DC Error'),('2024-04-10 01:32:35',5,'IO','Export Error'),('2024-04-10 01:37:26',1,'IO','Valve 1 Error'),('2024-04-10 01:37:26',2,'IO','Valve 2 Error'),('2024-04-10 01:37:26',3,'IO','Valve 3 Error'),('2024-04-10 01:37:26',4,'IO','Mix DC Error'),('2024-04-10 01:37:26',5,'IO','Export Error'),('2024-04-10 01:41:40',1,'IO','Valve 1 Error'),('2024-04-10 01:41:40',2,'IO','Valve 2 Error'),('2024-04-10 01:41:40',3,'IO','Valve 3 Error'),('2024-04-10 01:41:40',4,'IO','Mix DC Error'),('2024-04-10 01:41:40',5,'IO','Export Error'),('2024-04-10 01:46:30',1,'IO','Valve 1 Error'),('2024-04-10 01:46:30',2,'IO','Valve 2 Error'),('2024-04-10 01:46:30',3,'IO','Valve 3 Error'),('2024-04-10 01:46:30',4,'IO','Mix DC Error'),('2024-04-10 01:46:30',5,'IO','Export Error'),('2024-04-10 01:55:06',1,'IO','Valve 1 Error'),('2024-04-10 01:55:06',2,'IO','Valve 2 Error'),('2024-04-10 01:55:06',3,'IO','Valve 3 Error'),('2024-04-10 01:55:06',4,'IO','Mix DC Error'),('2024-04-10 01:55:06',5,'IO','Export Error'),('2024-04-10 01:58:00',1,'IO','Valve 1 Error'),('2024-04-10 01:58:00',2,'IO','Valve 2 Error'),('2024-04-10 01:58:00',3,'IO','Valve 3 Error'),('2024-04-10 01:58:00',4,'IO','Mix DC Error'),('2024-04-10 01:58:00',5,'IO','Export Error'),('2024-04-10 01:58:39',1,'IO','Valve 1 Error'),('2024-04-10 01:58:39',2,'IO','Valve 2 Error'),('2024-04-10 01:58:39',3,'IO','Valve 3 Error'),('2024-04-10 01:58:39',4,'IO','Mix DC Error'),('2024-04-10 01:58:39',5,'IO','Export Error'),('2024-04-10 13:45:19',1,'IO','Valve 1 Error'),('2024-04-10 13:45:19',2,'IO','Valve 2 Error'),('2024-04-10 13:45:19',3,'IO','Valve 3 Error'),('2024-04-10 13:45:19',4,'IO','Mix DC Error'),('2024-04-10 13:45:19',5,'IO','Export Error'),('2024-04-10 13:53:26',1,'IO','Valve 1 Error'),('2024-04-10 13:53:26',2,'IO','Valve 2 Error'),('2024-04-10 13:53:26',3,'IO','Valve 3 Error'),('2024-04-10 13:53:26',4,'IO','Mix DC Error'),('2024-04-10 13:53:26',5,'IO','Export Error'),('2024-04-10 13:54:36',1,'IO','Valve 1 Error'),('2024-04-10 13:54:36',2,'IO','Valve 2 Error'),('2024-04-10 13:54:36',3,'IO','Valve 3 Error'),('2024-04-10 13:54:36',4,'IO','Mix DC Error'),('2024-04-10 13:54:36',5,'IO','Export Error'),('2024-04-10 13:55:50',1,'IO','Valve 1 Error'),('2024-04-10 13:55:50',2,'IO','Valve 2 Error'),('2024-04-10 13:55:50',3,'IO','Valve 3 Error'),('2024-04-10 13:55:50',4,'IO','Mix DC Error'),('2024-04-10 13:55:50',5,'IO','Export Error'),('2024-04-10 13:57:03',1,'IO','Valve 1 Error'),('2024-04-10 13:57:03',2,'IO','Valve 2 Error'),('2024-04-10 13:57:03',3,'IO','Valve 3 Error'),('2024-04-10 13:57:03',4,'IO','Mix DC Error'),('2024-04-10 13:57:03',5,'IO','Export Error'),('2024-04-10 14:01:30',1,'IO','Valve 1 Error'),('2024-04-10 14:01:30',2,'IO','Valve 2 Error'),('2024-04-10 14:01:30',3,'IO','Valve 3 Error'),('2024-04-10 14:01:30',4,'IO','Mix DC Error'),('2024-04-10 14:01:30',5,'IO','Export Error'),('2024-04-10 14:05:46',1,'IO','Valve 1 Error'),('2024-04-10 14:05:46',2,'IO','Valve 2 Error'),('2024-04-10 14:05:46',3,'IO','Valve 3 Error'),('2024-04-10 14:05:46',4,'IO','Mix DC Error'),('2024-04-10 14:05:46',5,'IO','Export Error'),('2024-04-10 14:15:43',1,'I','Valve 1 Error'),('2024-04-10 14:15:43',2,'I','Valve 2 Error'),('2024-04-10 14:15:43',3,'I','Valve 3 Error'),('2024-04-10 14:15:43',4,'I','Mix DC Error'),('2024-04-10 14:15:43',5,'I','Export Error'),('2024-04-10 14:23:39',1,'I','Valve 1 Error'),('2024-04-10 14:23:39',2,'I','Valve 2 Error'),('2024-04-10 14:23:39',3,'I','Valve 3 Error'),('2024-04-10 14:23:39',4,'I','Mix DC Error'),('2024-04-10 14:23:39',5,'I','Export Error'),('2024-04-10 14:25:36',1,'I','Valve 1 Error'),('2024-04-10 14:25:36',2,'I','Valve 2 Error'),('2024-04-10 14:25:36',3,'I','Valve 3 Error'),('2024-04-10 14:25:36',4,'I','Mix DC Error'),('2024-04-10 14:25:36',5,'I','Export Error'),('2024-04-10 14:33:47',1,'I','Valve 1 Error'),('2024-04-10 14:33:47',2,'I','Valve 2 Error'),('2024-04-10 14:33:47',3,'I','Valve 3 Error'),('2024-04-10 14:33:47',4,'I','Mix DC Error'),('2024-04-10 14:33:47',5,'I','Export Error'),('2024-04-10 14:47:50',1,'I','Valve 1 Error'),('2024-04-10 14:47:50',2,'I','Valve 2 Error'),('2024-04-10 14:47:50',3,'I','Valve 3 Error'),('2024-04-10 14:47:50',4,'I','Mix DC Error'),('2024-04-10 14:47:50',5,'I','Export Error'),('2024-04-10 15:02:43',1,'I','Valve 1 Error'),('2024-04-10 15:02:43',2,'I','Valve 2 Error'),('2024-04-10 15:02:43',3,'I','Valve 3 Error'),('2024-04-10 15:02:43',4,'I','Mix DC Error'),('2024-04-10 15:02:43',5,'I','Export Error'),('2024-04-10 15:06:57',1,'I','Valve 1 Error'),('2024-04-10 15:06:57',2,'I','Valve 2 Error'),('2024-04-10 15:06:57',3,'I','Valve 3 Error'),('2024-04-10 15:06:57',4,'I','Mix DC Error'),('2024-04-10 15:06:57',5,'I','Export Error'),('2024-04-10 15:17:21',1,'I','Valve 1 Error'),('2024-04-10 15:17:21',2,'I','Valve 2 Error'),('2024-04-10 15:17:21',3,'I','Valve 3 Error'),('2024-04-10 15:17:21',4,'I','Mix DC Error'),('2024-04-10 15:17:21',5,'I','Export Error'),('2024-04-11 23:02:47',1,'I','Valve 1 Error'),('2024-04-11 23:02:47',2,'I','Valve 2 Error'),('2024-04-11 23:02:47',3,'I','Valve 3 Error'),('2024-04-11 23:02:47',4,'I','Mix DC Error'),('2024-04-11 23:02:47',5,'I','Export Error'),('2024-04-11 23:04:25',1,'I','Valve 1 Error'),('2024-04-11 23:04:25',2,'I','Valve 2 Error'),('2024-04-11 23:04:25',3,'I','Valve 3 Error'),('2024-04-11 23:04:25',4,'I','Mix DC Error'),('2024-04-11 23:04:25',5,'I','Export Error'),('2024-04-11 23:06:32',1,'I','Valve 1 Error'),('2024-04-11 23:06:32',2,'I','Valve 2 Error'),('2024-04-11 23:06:32',3,'I','Valve 3 Error'),('2024-04-11 23:06:32',4,'I','Mix DC Error'),('2024-04-11 23:06:32',5,'I','Export Error'),('2024-04-11 23:08:42',1,'I','Valve 1 Error'),('2024-04-11 23:08:42',2,'I','Valve 2 Error'),('2024-04-11 23:08:42',3,'I','Valve 3 Error'),('2024-04-11 23:08:42',4,'I','Mix DC Error'),('2024-04-11 23:08:42',5,'I','Export Error'),('2024-04-11 23:18:05',1,'I','Valve 1 Error'),('2024-04-11 23:18:05',2,'I','Valve 2 Error'),('2024-04-11 23:18:05',3,'I','Valve 3 Error'),('2024-04-11 23:18:05',4,'I','Mix DC Error'),('2024-04-11 23:18:05',5,'I','Export Error'),('2024-04-12 00:01:37',1,'I','Valve 1 Error'),('2024-04-12 00:01:37',2,'I','Valve 2 Error'),('2024-04-12 00:01:37',3,'I','Valve 3 Error'),('2024-04-12 00:01:37',4,'I','Mix DC Error'),('2024-04-12 00:01:37',5,'I','Export Error'),('2024-04-12 00:09:40',1,'I','Valve 1 Error'),('2024-04-12 00:09:40',2,'I','Valve 2 Error'),('2024-04-12 00:09:40',3,'I','Valve 3 Error'),('2024-04-12 00:09:40',4,'I','Mix DC Error'),('2024-04-12 00:09:40',5,'I','Export Error'),('2024-04-12 00:11:56',1,'I','Valve 1 Error'),('2024-04-12 00:11:56',2,'I','Valve 2 Error'),('2024-04-12 00:11:56',3,'I','Valve 3 Error'),('2024-04-12 00:11:56',4,'I','Mix DC Error'),('2024-04-12 00:11:56',5,'I','Export Error'),('2024-04-12 00:17:27',1,'I','Valve 1 Error'),('2024-04-12 00:17:27',2,'I','Valve 2 Error'),('2024-04-12 00:17:27',3,'I','Valve 3 Error'),('2024-04-12 00:17:27',4,'I','Mix DC Error'),('2024-04-12 00:17:27',5,'I','Export Error'),('2024-04-12 00:18:13',1,'I','Valve 1 Error'),('2024-04-12 00:18:13',2,'I','Valve 2 Error'),('2024-04-12 00:18:13',3,'I','Valve 3 Error'),('2024-04-12 00:18:13',4,'I','Mix DC Error'),('2024-04-12 00:18:13',5,'I','Export Error'),('2024-04-12 00:31:00',1,'I','Valve 1 Error'),('2024-04-12 00:31:00',2,'I','Valve 2 Error'),('2024-04-12 00:31:00',3,'I','Valve 3 Error'),('2024-04-12 00:31:00',4,'I','Mix DC Error'),('2024-04-12 00:31:00',5,'I','Export Error'),('2024-04-12 00:34:39',1,'I','Valve 1 Error'),('2024-04-12 00:34:39',2,'I','Valve 2 Error'),('2024-04-12 00:34:39',3,'I','Valve 3 Error'),('2024-04-12 00:34:39',4,'I','Mix DC Error'),('2024-04-12 00:34:39',5,'I','Export Error'),('2024-04-12 00:37:56',1,'I','Valve 1 Error'),('2024-04-12 00:37:56',2,'I','Valve 2 Error'),('2024-04-12 00:37:56',3,'I','Valve 3 Error'),('2024-04-12 00:37:56',4,'I','Mix DC Error'),('2024-04-12 00:37:56',5,'I','Export Error'),('2024-04-12 00:42:06',1,'I','Valve 1 Error'),('2024-04-12 00:42:06',2,'I','Valve 2 Error'),('2024-04-12 00:42:06',3,'I','Valve 3 Error'),('2024-04-12 00:42:06',4,'I','Mix DC Error'),('2024-04-12 00:42:06',5,'I','Export Error'),('2024-04-12 00:46:20',1,'I','Valve 1 Error'),('2024-04-12 00:46:20',2,'I','Valve 2 Error'),('2024-04-12 00:46:20',3,'I','Valve 3 Error'),('2024-04-12 00:46:20',4,'I','Mix DC Error'),('2024-04-12 00:46:20',5,'I','Export Error'),('2024-04-12 00:58:38',1,'I','Valve 1 Error'),('2024-04-12 00:58:38',2,'I','Valve 2 Error'),('2024-04-12 00:58:38',3,'I','Valve 3 Error'),('2024-04-12 00:58:38',4,'I','Mix DC Error'),('2024-04-12 00:58:38',5,'I','Export Error'),('2024-04-12 01:01:56',1,'I','Valve 1 Error'),('2024-04-12 01:01:56',2,'I','Valve 2 Error'),('2024-04-12 01:01:56',3,'I','Valve 3 Error'),('2024-04-12 01:01:56',4,'I','Mix DC Error'),('2024-04-12 01:01:56',5,'I','Export Error'),('2024-04-12 01:02:48',1,'I','Valve 1 Error'),('2024-04-12 01:02:48',2,'I','Valve 2 Error'),('2024-04-12 01:02:48',3,'I','Valve 3 Error'),('2024-04-12 01:02:48',4,'I','Mix DC Error'),('2024-04-12 01:02:48',5,'I','Export Error'),('2024-04-12 01:03:26',1,'I','Valve 1 Error'),('2024-04-12 01:03:26',2,'I','Valve 2 Error'),('2024-04-12 01:03:26',3,'I','Valve 3 Error'),('2024-04-12 01:03:26',4,'I','Mix DC Error'),('2024-04-12 01:03:26',5,'I','Export Error'),('2024-04-12 01:05:52',1,'I','Valve 1 Error'),('2024-04-12 01:05:52',2,'I','Valve 2 Error'),('2024-04-12 01:05:52',3,'I','Valve 3 Error'),('2024-04-12 01:05:52',4,'I','Mix DC Error'),('2024-04-12 01:05:52',5,'I','Export Error'),('2024-04-12 11:59:52',1,'I','Valve 1 Error'),('2024-04-12 11:59:52',2,'I','Valve 2 Error'),('2024-04-12 11:59:52',3,'I','Valve 3 Error'),('2024-04-12 11:59:52',4,'I','Mix DC Error'),('2024-04-12 11:59:52',5,'I','Export Error'),('2024-04-12 12:07:02',1,'I','Valve 1 Error'),('2024-04-12 12:07:02',2,'I','Valve 2 Error'),('2024-04-12 12:07:02',3,'I','Valve 3 Error'),('2024-04-12 12:07:02',4,'I','Mix DC Error'),('2024-04-12 12:07:02',5,'I','Export Error'),('2024-04-13 08:41:32',1,'I','Valve 1 Error'),('2024-04-13 08:41:32',2,'I','Valve 2 Error'),('2024-04-13 08:41:32',3,'I','Valve 3 Error'),('2024-04-13 08:41:32',4,'I','Mix DC Error'),('2024-04-13 08:41:32',5,'I','Export Error'),('2024-04-13 08:46:14',1,'I','Valve 1 Error'),('2024-04-13 08:46:14',2,'I','Valve 2 Error'),('2024-04-13 08:46:14',3,'I','Valve 3 Error'),('2024-04-13 08:46:14',4,'I','Mix DC Error'),('2024-04-13 08:46:14',5,'I','Export Error'),('2024-04-13 19:19:07',1,'I','Valve 1 Error'),('2024-04-13 19:19:07',2,'I','Valve 2 Error'),('2024-04-13 19:19:07',3,'I','Valve 3 Error'),('2024-04-13 19:19:07',4,'I','Mix DC Error'),('2024-04-13 19:19:07',5,'I','Export Error'),('2024-04-13 19:37:49',1,'I','Valve 1 Error'),('2024-04-13 19:37:49',2,'I','Valve 2 Error'),('2024-04-13 19:37:49',3,'I','Valve 3 Error'),('2024-04-13 19:37:49',4,'I','Mix DC Error'),('2024-04-13 19:37:49',5,'I','Export Error'),('2024-04-13 19:41:34',1,'I','Valve 1 Error'),('2024-04-13 19:41:34',2,'I','Valve 2 Error'),('2024-04-13 19:41:34',3,'I','Valve 3 Error'),('2024-04-13 19:41:34',4,'I','Mix DC Error'),('2024-04-13 19:41:34',5,'I','Export Error'),('2024-04-13 20:14:19',1,'I','Valve 1 Error'),('2024-04-13 20:14:19',2,'I','Valve 2 Error'),('2024-04-13 20:14:19',3,'I','Valve 3 Error'),('2024-04-13 20:14:19',4,'I','Mix DC Error'),('2024-04-13 20:14:19',5,'I','Export Error'),('2024-04-13 20:18:59',1,'I','Valve 1 Error'),('2024-04-13 20:18:59',2,'I','Valve 2 Error'),('2024-04-13 20:18:59',3,'I','Valve 3 Error'),('2024-04-13 20:18:59',4,'I','Mix DC Error'),('2024-04-13 20:18:59',5,'I','Export Error'),('2024-04-13 20:24:48',1,'I','Valve 1 Error'),('2024-04-13 20:24:48',2,'I','Valve 2 Error'),('2024-04-13 20:24:48',3,'I','Valve 3 Error'),('2024-04-13 20:24:48',4,'I','Mix DC Error'),('2024-04-13 20:24:48',5,'I','Export Error'),('2024-04-13 20:27:21',1,'I','Valve 1 Error'),('2024-04-13 20:27:21',2,'I','Valve 2 Error'),('2024-04-13 20:27:21',3,'I','Valve 3 Error'),('2024-04-13 20:27:21',4,'I','Mix DC Error'),('2024-04-13 20:27:21',5,'I','Export Error'),('2024-04-13 20:32:48',1,'I','Valve 1 Error'),('2024-04-13 20:32:48',2,'I','Valve 2 Error'),('2024-04-13 20:32:48',3,'I','Valve 3 Error'),('2024-04-13 20:32:48',4,'I','Mix DC Error'),('2024-04-13 20:32:48',5,'I','Export Error');
/*!40000 ALTER TABLE `sql_alarm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sql_data`
--

DROP TABLE IF EXISTS `sql_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sql_data` (
  `Date` datetime NOT NULL,
  `Order ID` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `Material 1 Setting` float DEFAULT NULL,
  `Material 2 Setting` float DEFAULT NULL,
  `Material 3 Setting` float DEFAULT NULL,
  `Mix Time Setting` int DEFAULT NULL,
  `Material 1 Actual` float DEFAULT NULL,
  `Material 2 Actual` float DEFAULT NULL,
  `Material 3 Actual` float DEFAULT NULL,
  `Mix Time Actual` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sql_data`
--

LOCK TABLES `sql_data` WRITE;
/*!40000 ALTER TABLE `sql_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `sql_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sql_mass`
--

DROP TABLE IF EXISTS `sql_mass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sql_mass` (
  `Date` datetime NOT NULL,
  `Order ID` varchar(45) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `Material 1 Setting` float DEFAULT NULL,
  `Material 2 Setting` float DEFAULT NULL,
  `Material 3 Setting` float DEFAULT NULL,
  `Mix Time Setting` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sql_mass`
--

LOCK TABLES `sql_mass` WRITE;
/*!40000 ALTER TABLE `sql_mass` DISABLE KEYS */;
/*!40000 ALTER TABLE `sql_mass` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Current Database: `3_sql_s2`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `3_sql_s2` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `3_sql_s2`;

--
-- Table structure for table `sql_alarm_s2`
--

DROP TABLE IF EXISTS `sql_alarm_s2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sql_alarm_s2` (
  `Date` datetime NOT NULL,
  `ID` int DEFAULT NULL,
  `Status` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `Alarm Name` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sql_alarm_s2`
--

LOCK TABLES `sql_alarm_s2` WRITE;
/*!40000 ALTER TABLE `sql_alarm_s2` DISABLE KEYS */;
INSERT INTO `sql_alarm_s2` VALUES ('2024-04-11 23:02:43',1,'I','Valve 1 Error'),('2024-04-11 23:02:43',2,'I','Valve 2 Error'),('2024-04-11 23:02:43',3,'I','Valve 3 Error'),('2024-04-11 23:02:43',4,'I','Mix DC Error'),('2024-04-11 23:02:43',5,'I','Export Error'),('2024-04-11 23:04:20',1,'I','Valve 1 Error'),('2024-04-11 23:04:20',2,'I','Valve 2 Error'),('2024-04-11 23:04:20',3,'I','Valve 3 Error'),('2024-04-11 23:04:20',4,'I','Mix DC Error'),('2024-04-11 23:04:20',5,'I','Export Error'),('2024-04-11 23:06:27',1,'I','Valve 1 Error'),('2024-04-11 23:06:27',2,'I','Valve 2 Error'),('2024-04-11 23:06:27',3,'I','Valve 3 Error'),('2024-04-11 23:06:27',4,'I','Mix DC Error'),('2024-04-11 23:06:27',5,'I','Export Error'),('2024-04-11 23:08:37',1,'I','Valve 1 Error'),('2024-04-11 23:08:37',2,'I','Valve 2 Error'),('2024-04-11 23:08:37',3,'I','Valve 3 Error'),('2024-04-11 23:08:37',4,'I','Mix DC Error'),('2024-04-11 23:08:37',5,'I','Export Error'),('2024-04-11 23:18:00',1,'I','Valve 1 Error'),('2024-04-11 23:18:00',2,'I','Valve 2 Error'),('2024-04-11 23:18:00',3,'I','Valve 3 Error'),('2024-04-11 23:18:00',4,'I','Mix DC Error'),('2024-04-11 23:18:00',5,'I','Export Error'),('2024-04-12 00:01:33',1,'I','Valve 1 Error'),('2024-04-12 00:01:33',2,'I','Valve 2 Error'),('2024-04-12 00:01:33',3,'I','Valve 3 Error'),('2024-04-12 00:01:33',4,'I','Mix DC Error'),('2024-04-12 00:01:33',5,'I','Export Error'),('2024-04-12 00:09:36',1,'I','Valve 1 Error'),('2024-04-12 00:09:36',2,'I','Valve 2 Error'),('2024-04-12 00:09:36',3,'I','Valve 3 Error'),('2024-04-12 00:09:36',4,'I','Mix DC Error'),('2024-04-12 00:09:36',5,'I','Export Error'),('2024-04-12 00:11:52',1,'I','Valve 1 Error'),('2024-04-12 00:11:52',2,'I','Valve 2 Error'),('2024-04-12 00:11:52',3,'I','Valve 3 Error'),('2024-04-12 00:11:52',4,'I','Mix DC Error'),('2024-04-12 00:11:52',5,'I','Export Error'),('2024-04-12 00:17:22',1,'I','Valve 1 Error'),('2024-04-12 00:17:22',2,'I','Valve 2 Error'),('2024-04-12 00:17:22',3,'I','Valve 3 Error'),('2024-04-12 00:17:22',4,'I','Mix DC Error'),('2024-04-12 00:17:22',5,'I','Export Error'),('2024-04-12 00:18:09',1,'I','Valve 1 Error'),('2024-04-12 00:18:09',2,'I','Valve 2 Error'),('2024-04-12 00:18:09',3,'I','Valve 3 Error'),('2024-04-12 00:18:09',4,'I','Mix DC Error'),('2024-04-12 00:18:09',5,'I','Export Error'),('2024-04-12 00:30:55',1,'I','Valve 1 Error'),('2024-04-12 00:30:55',2,'I','Valve 2 Error'),('2024-04-12 00:30:55',3,'I','Valve 3 Error'),('2024-04-12 00:30:55',4,'I','Mix DC Error'),('2024-04-12 00:30:55',5,'I','Export Error'),('2024-04-12 00:34:34',1,'I','Valve 1 Error'),('2024-04-12 00:34:34',2,'I','Valve 2 Error'),('2024-04-12 00:34:34',3,'I','Valve 3 Error'),('2024-04-12 00:34:34',4,'I','Mix DC Error'),('2024-04-12 00:34:34',5,'I','Export Error'),('2024-04-12 00:37:51',1,'I','Valve 1 Error'),('2024-04-12 00:37:51',2,'I','Valve 2 Error'),('2024-04-12 00:37:51',3,'I','Valve 3 Error'),('2024-04-12 00:37:51',4,'I','Mix DC Error'),('2024-04-12 00:37:51',5,'I','Export Error'),('2024-04-12 00:42:01',1,'I','Valve 1 Error'),('2024-04-12 00:42:01',2,'I','Valve 2 Error'),('2024-04-12 00:42:01',3,'I','Valve 3 Error'),('2024-04-12 00:42:01',4,'I','Mix DC Error'),('2024-04-12 00:42:01',5,'I','Export Error'),('2024-04-12 00:46:15',1,'I','Valve 1 Error'),('2024-04-12 00:46:15',2,'I','Valve 2 Error'),('2024-04-12 00:46:15',3,'I','Valve 3 Error'),('2024-04-12 00:46:15',4,'I','Mix DC Error'),('2024-04-12 00:46:15',5,'I','Export Error'),('2024-04-12 00:58:34',1,'I','Valve 1 Error'),('2024-04-12 00:58:34',2,'I','Valve 2 Error'),('2024-04-12 00:58:34',3,'I','Valve 3 Error'),('2024-04-12 00:58:34',4,'I','Mix DC Error'),('2024-04-12 00:58:34',5,'I','Export Error'),('2024-04-12 01:01:51',1,'I','Valve 1 Error'),('2024-04-12 01:01:51',2,'I','Valve 2 Error'),('2024-04-12 01:01:51',3,'I','Valve 3 Error'),('2024-04-12 01:01:51',4,'I','Mix DC Error'),('2024-04-12 01:01:51',5,'I','Export Error'),('2024-04-12 01:02:44',1,'I','Valve 1 Error'),('2024-04-12 01:02:44',2,'I','Valve 2 Error'),('2024-04-12 01:02:44',3,'I','Valve 3 Error'),('2024-04-12 01:02:44',4,'I','Mix DC Error'),('2024-04-12 01:02:44',5,'I','Export Error'),('2024-04-12 01:03:21',1,'I','Valve 1 Error'),('2024-04-12 01:03:21',2,'I','Valve 2 Error'),('2024-04-12 01:03:21',3,'I','Valve 3 Error'),('2024-04-12 01:03:21',4,'I','Mix DC Error'),('2024-04-12 01:03:21',5,'I','Export Error'),('2024-04-12 01:05:48',1,'I','Valve 1 Error'),('2024-04-12 01:05:48',2,'I','Valve 2 Error'),('2024-04-12 01:05:48',3,'I','Valve 3 Error'),('2024-04-12 01:05:48',4,'I','Mix DC Error'),('2024-04-12 01:05:48',5,'I','Export Error'),('2024-04-12 11:59:48',1,'I','Valve 1 Error'),('2024-04-12 11:59:48',2,'I','Valve 2 Error'),('2024-04-12 11:59:48',3,'I','Valve 3 Error'),('2024-04-12 11:59:48',4,'I','Mix DC Error'),('2024-04-12 11:59:48',5,'I','Export Error'),('2024-04-12 12:06:58',1,'I','Valve 1 Error'),('2024-04-12 12:06:58',2,'I','Valve 2 Error'),('2024-04-12 12:06:58',3,'I','Valve 3 Error'),('2024-04-12 12:06:58',4,'I','Mix DC Error'),('2024-04-12 12:06:58',5,'I','Export Error'),('2024-04-13 08:41:28',1,'I','Valve 1 Error'),('2024-04-13 08:41:28',2,'I','Valve 2 Error'),('2024-04-13 08:41:28',3,'I','Valve 3 Error'),('2024-04-13 08:41:28',4,'I','Mix DC Error'),('2024-04-13 08:41:28',5,'I','Export Error'),('2024-04-13 08:46:10',1,'I','Valve 1 Error'),('2024-04-13 08:46:10',2,'I','Valve 2 Error'),('2024-04-13 08:46:10',3,'I','Valve 3 Error'),('2024-04-13 08:46:10',4,'I','Mix DC Error'),('2024-04-13 08:46:10',5,'I','Export Error'),('2024-04-13 19:19:11',1,'I','Valve 1 Error'),('2024-04-13 19:19:11',2,'I','Valve 2 Error'),('2024-04-13 19:19:11',3,'I','Valve 3 Error'),('2024-04-13 19:19:11',4,'I','Mix DC Error'),('2024-04-13 19:19:11',5,'I','Export Error'),('2024-04-13 19:37:53',1,'I','Valve 1 Error'),('2024-04-13 19:37:53',2,'I','Valve 2 Error'),('2024-04-13 19:37:53',3,'I','Valve 3 Error'),('2024-04-13 19:37:53',4,'I','Mix DC Error'),('2024-04-13 19:37:53',5,'I','Export Error'),('2024-04-13 19:41:39',1,'I','Valve 1 Error'),('2024-04-13 19:41:39',2,'I','Valve 2 Error'),('2024-04-13 19:41:39',3,'I','Valve 3 Error'),('2024-04-13 19:41:39',4,'I','Mix DC Error'),('2024-04-13 19:41:39',5,'I','Export Error'),('2024-04-13 20:14:24',1,'I','Valve 1 Error'),('2024-04-13 20:14:24',2,'I','Valve 2 Error'),('2024-04-13 20:14:24',3,'I','Valve 3 Error'),('2024-04-13 20:14:24',4,'I','Mix DC Error'),('2024-04-13 20:14:24',5,'I','Export Error'),('2024-04-13 20:19:03',1,'I','Valve 1 Error'),('2024-04-13 20:19:03',2,'I','Valve 2 Error'),('2024-04-13 20:19:03',3,'I','Valve 3 Error'),('2024-04-13 20:19:03',4,'I','Mix DC Error'),('2024-04-13 20:19:03',5,'I','Export Error'),('2024-04-13 20:24:52',1,'I','Valve 1 Error'),('2024-04-13 20:24:52',2,'I','Valve 2 Error'),('2024-04-13 20:24:52',3,'I','Valve 3 Error'),('2024-04-13 20:24:52',4,'I','Mix DC Error'),('2024-04-13 20:24:52',5,'I','Export Error'),('2024-04-13 20:27:26',1,'I','Valve 1 Error'),('2024-04-13 20:27:26',2,'I','Valve 2 Error'),('2024-04-13 20:27:26',3,'I','Valve 3 Error'),('2024-04-13 20:27:26',4,'I','Mix DC Error'),('2024-04-13 20:27:26',5,'I','Export Error'),('2024-04-13 20:32:52',1,'I','Valve 1 Error'),('2024-04-13 20:32:52',2,'I','Valve 2 Error'),('2024-04-13 20:32:52',3,'I','Valve 3 Error'),('2024-04-13 20:32:52',4,'I','Mix DC Error'),('2024-04-13 20:32:52',5,'I','Export Error');
/*!40000 ALTER TABLE `sql_alarm_s2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sql_data_s2`
--

DROP TABLE IF EXISTS `sql_data_s2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sql_data_s2` (
  `Date` datetime NOT NULL,
  `Order ID` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `Material 1 Setting` float DEFAULT NULL,
  `Material 2 Setting` float DEFAULT NULL,
  `Material 3 Setting` float DEFAULT NULL,
  `Mix Time Setting` int DEFAULT NULL,
  `Material 1 Actual` float DEFAULT NULL,
  `Material 2 Actual` float DEFAULT NULL,
  `Material 3 Actual` float DEFAULT NULL,
  `Mix Time Actual` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sql_data_s2`
--

LOCK TABLES `sql_data_s2` WRITE;
/*!40000 ALTER TABLE `sql_data_s2` DISABLE KEYS */;
/*!40000 ALTER TABLE `sql_data_s2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sql_mass_s2`
--

DROP TABLE IF EXISTS `sql_mass_s2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sql_mass_s2` (
  `Date` datetime NOT NULL,
  `Order ID` varchar(45) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `Material 1 Setting` float DEFAULT NULL,
  `Material 2 Setting` float DEFAULT NULL,
  `Material 3 Setting` float DEFAULT NULL,
  `Mix Time Setting` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sql_mass_s2`
--

LOCK TABLES `sql_mass_s2` WRITE;
/*!40000 ALTER TABLE `sql_mass_s2` DISABLE KEYS */;
/*!40000 ALTER TABLE `sql_mass_s2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Current Database: `3_sql_users`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `3_sql_users` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `3_sql_users`;

--
-- Table structure for table `sql_user_time`
--

DROP TABLE IF EXISTS `sql_user_time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sql_user_time` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `Email` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `Password` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `LoginTime` datetime DEFAULT NULL,
  `LogoutTime` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sql_user_time`
--

LOCK TABLES `sql_user_time` WRITE;
/*!40000 ALTER TABLE `sql_user_time` DISABLE KEYS */;
INSERT INTO `sql_user_time` VALUES (1,'admin','admin@gmail.com','123','2024-04-13 20:42:19','2024-04-13 20:27:33'),(2,'user1','user1@gmail.com','1','2024-04-13 20:42:34','2024-04-13 20:20:39'),(3,'user2','user2@gmail.com','2','2024-04-13 20:42:41','2024-04-13 20:29:17');
/*!40000 ALTER TABLE `sql_user_time` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-14 10:58:20
