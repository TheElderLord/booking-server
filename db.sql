CREATE DATABASE  IF NOT EXISTS `booking` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `booking`;
-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (arm64)
--
-- Host: localhost    Database: booking
-- ------------------------------------------------------
-- Server version	8.1.0

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
-- Table structure for table `bookhistory`
--

DROP TABLE IF EXISTS `bookhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookhistory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `lastname` varchar(225) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `iin` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `startDate` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `endDate` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `comments` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `roomId` int NOT NULL,
  `created_at` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `isPaid` int DEFAULT '0',
  `given` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `roomId_idx` (`roomId`),
  CONSTRAINT `roomId` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookhistory`
--

LOCK TABLES `bookhistory` WRITE;
/*!40000 ALTER TABLE `bookhistory` DISABLE KEYS */;
INSERT INTO `bookhistory` VALUES (14,'ElderLord','','123123','21.03.2024','22.03.2024',NULL,2,NULL,0,0),(18,'Аман','Шалбан','12312341','25.04.2024','28.04.2024',NULL,2,NULL,1,0),(25,'Arman','',NULL,'05.04.2024','15.04.2024',NULL,3,'28.04.2024, 10:55:11',1,20000),(27,'Almas','',NULL,'02.05.2024','07.05.2024',NULL,3,'13.05.2024, 22:20:32',0,0),(28,'Akzhan','',NULL,'02.05.2024','07.05.2024',NULL,4,'13.05.2024, 22:20:47',0,0),(29,'Запись 1','',NULL,'16.04.2024','23.04.2024',NULL,3,'13.05.2024, 22:22:37',0,0),(30,'Кайсар','',NULL,'05.06.2024','13.06.2024',NULL,2,'13.05.2024, 22:24:04',0,0),(31,'Запись 3','',NULL,'12.05.2024','20.05.2024',NULL,3,'13.05.2024, 22:27:15',0,0);
/*!40000 ALTER TABLE `bookhistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requests`
--

DROP TABLE IF EXISTS `requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `lastname` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `iin` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `number` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT '0',
  `status` int DEFAULT '0',
  `day` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `time` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requests`
--

LOCK TABLES `requests` WRITE;
/*!40000 ALTER TABLE `requests` DISABLE KEYS */;
INSERT INTO `requests` VALUES (1,'dasd',NULL,'sdas','dsad',1,'',''),(2,'Arsen',NULL,'2002012001','139103921031',1,'',''),(3,'Arsen',NULL,'2002012001','139103921031',1,'',''),(4,'ElderLord',NULL,'01203131','854054035',1,'',''),(5,'Elder',NULL,'0103123','3124819083',1,'',''),(6,'adad',NULL,'10230123','3182379013',1,'',''),(7,'Арсен',NULL,'213123123','877313123',1,'',''),(8,'dasd',NULL,'dasd','das',1,'28.01.2024',' 01:31:53'),(9,'dasd',NULL,'dasd','das',1,'28.01.2024',' 01:31:54'),(10,'dasd',NULL,'dasd','dsad',1,'28.01.2024',' 01:32:06'),(11,'',NULL,'','',1,'28.01.2024',' 01:34:07'),(12,'',NULL,'','',1,'28.01.2024',' 01:34:54'),(13,'dsa',NULL,'dsa','dasd',1,'28.01.2024',' 01:35:29'),(14,'ElderLord','Мынбаев','12313','344444',1,'22.04.2024',' 01:28:08'),(15,'Арсен','Мынбаев','31414','13213123',1,'22.04.2024',' 17:17:03'),(16,'Арсен','Мынбаев','3144214','845918948213',1,'22.04.2024',' 21:29:16');
/*!40000 ALTER TABLE `requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(225) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `location` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `price` int DEFAULT NULL,
  `floor` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `complex` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `square` double DEFAULT NULL,
  `kitchen_square` double DEFAULT NULL,
  `conditions` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `coordinates` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `people_num` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `bed_num` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `description` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `images` varchar(225) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `small_images` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `short_name` varchar(100) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (2,'1-комнатная квартира, 39 м², 5/16 этаж посуточно, мкр Тастак-3, Варламова 27Д','мкр Тастак-3, Варламова 27Д',15000,'5 из 16','Lake Town',1,39,11,'свежий ремонт, новая мебель','43.240769, 76.870510','2','2','Апартамент Lux класса для кратковременого проживания. Удобное расположение возле ТРЦ Спутник. Рядом расположен:ТРЦ Спутник, Магнум, Метро, Аптека, Школы, детский сад, Каждому гостью предостовляется одноразовые гигиенические принадлежностиб свежее выглаженное белое постельное белье, полотенца, белые халаты.','1/1.webp,1/2.webp,1/3.webp,1/4.webp,1/5.webp,1/6.webp,1/7.webp','1/sm1.webp,1/sm2.webp,1/sm3.webp,1/sm4.webp,1/sm5.webp,1/sm6.webp,1/sm7.webp,1/sm8.webp,1/sm9.webp,1/sm10.webp','Тастак'),(3,'1-комнатная квартира, 48 м², 14/16 этаж посуточно, мкр Мамыр-1 29/8','мкр Мамыр-1 29/8',15000,'14 из 16','Спутник',1,48,14,'не новый, но аккуратный и чистый ремонт','43.212594, 76.845222','4','2','Апартамент Lux класса для краткоВременного проживания в новом комфортабельном жилом комплексе. Удобное расположение на берегу озера Сайрана. Рядом расположен: Тастак, Метро. Каждому гостью предоставляется одноразовые гигиенические принадлежности, свежее выглаженное белое постельное белье, полотенца, белые халаты.','2/1.webp,2/2.webp,2/3.webp,2/4.webp,2/5.webp,2/6.webp,2/7.webp,\n','2/sm1.webp,2/sm2.webp,2/sm3.webp,2/sm4.webp,2/sm5.webp,2/sm6.webp','Мамыр'),(4,'1-комнатная квартира, 52 м², 6/9 этаж посуточно, мкр Аксай-1А 23 — Ташкентское-Момышулы','мкр Аксай-1А 23',14000,'6 из 9','\nНИКО по Момышулы - Райымбека',1,52,14,'свежий ремонт, новая мебель','43.241714, 76.825253','2','1','Апартамент Lux класса для кратковременого проживания. Удобное расположение, район Аксай-1а, ЖК Нико. Ташкентское - Момышулы. Каждому гостю предостовляется одноразовые гигиенические принадлежности, свежее выглаженное белое постельное белье, полотенца, белые халаты.\nДля комфортного проживания в квартире есть все:\n- Бытовая техника, кондиционер, микровалновка, фен, утюг, гладильная доска. Все новое.\n-WiFi, смарт ТВ, Рядом с ЖК расположен “ Magnum”, Тарговый центр “Car City”, Small”, “Asia Park”, банк, банкоматы, рынок.','3/1.webp,3/2.webp,3/3.webp,3/4.webp,3/5.webp,3/6.webp','3/sm1.webp,3/sm2.webp,3/sm3.webp,3/sm4.webp,3/sm5.webp,3/sm6.webp','утеген'),(14,'1-комнатная квартира, 42 м², 4/13 этаж посуточно, мкр Сайран, Утеген батыра 17б','мкр Сайран, Утеген батыра 17б',15000,'4 из 13','\nUTEGEN',1,42,18,'не новый, но аккуратный и чистый ремонт','43.240939, 76.857134','2','2','Апартамент Lux класса для кратковременого проживания. Удобное расположение, район Сайран ЖК Utegen. рядом с Grand Park.\nКаждому гостю предостовляется одноразовые гигиенические принадлежности, свежее выглаженное белое постельное белье, полотенца, белые халаты.\nДля комфортного проживания в квартире есть все:\n- Бытовая техника, кондиционер, микровалновка, фен, утюг, гладильная доска. Все новое.\n-WiFi, смарт ТВ, Рядом с ЖК расположен “ Magnum”, Тарговый центр \"Grand Park\", \"Citi plus\", банк, банкоматы, автостанция Сайран.\n\nквартира не для проведения вечеринок. Просьба при себе иметь удостоверения личностию\n\nПримечание:\nпри заезде берется депозит 5000т за сутки, а при выезде сумма депозита возвращается если в квартире все нормально и не обкуряно.\n\nкелген кезде әр күн үшін 5000т депозит алынады, және шығатын кезінде, егер пәтерде бәрі қалыпты болса және темекі шегшегілмеген болса, депозит сомасы қайтарылады.','4/1.webp,4/2.webp,4/3.webp,4/4.webp,4/5.webp,4/6.webp,4/7.webp,4/8.webp,4/9.webp','4/sm1.webp,4/sm2.webp,4/sm3.webp,4/sm4.webp,4/sm5.webp,4/sm6.webp,4/sm7.webp,4/sm8.webp,4/sm9.webp\n','Уш сункар'),(15,'1-комнатная квартира, 42 м², 10/10 этаж посуточно, мкр Аксай-5, Б. Момышулы 25 — Маргулана','мкр Аксай-5, Б. Момышулы 25 — Маргулана',15000,'10 из 10','Уш Сункар',1,42,18,'свежий ремонт, новая мебель','43.231757, 76.832197','2','2','Апартамент Lux класса для кратковременого проживания. Удобное расположение, район Аксай-5, ЖК Уш-сункар. Момышулы-Маргулана.\nКаждому гостю предостовляется одноразовые гигиенические принадлежности, свежее выглаженное белое постельное белье, полотенца, белые халаты.\nДля комфортного проживания в квартире есть все:\n- Бытовая техника, кондиционер, микровалновка, фен, утюг, гладильная доска. Все новое.\n-WiFi, смарт ТВ, Рядом с ЖК расположен “ Magnum”, Тарговый центр \"Ush sunkar\", \"МЕЧТА\", банк, банкоматы, рынок.\n\nКвартира не для проведения вечеринок. Просьба при себе иметь удостоверения личностию.\n\nПримечание:\nпри заезде берется депозит 5000т за сутки, а при выезде сумма депозита возвращается если в квартире все нормально и не обкуряно.\n\nкелген кезде әр күн үшін 5000т депозит алынады, және шығатын кезінде, егер пәтерде бәрі қалыпты болса және темекі шегшегілмеген болса, депозит сомасы қайтарылады.','5/1.webp,5/2.webp,5/3.webp,5/4.webp,5/5.webp,5/6.webp,5/7.webp,5/8.webp,5/9.webp','5/sm1.webp,5/sm2.webp,5/sm3.webp,5/sm4.webp,5/sm5.webp,5/sm6.webp,5/sm7.webp,\n5/sm8.webp,5/sm9.webp\n','Аксай'),(16,'1-комнатная квартира, 42 м², 1/9 этаж посуточно, мкр Сайран, Утеген батыра 114','мкр Сайран, Утеген батыра 114',15000,'1 из 9','Родник-1',1,42,12,'свежий ремонт, новая мебель','43.238194, 76.863233','2','2','Апартамент Lux класса для кратковременого проживания. Удобное расположение, район Аксай-5, ЖК Уш-сункар. Момышулы-Маргулана. Каждому гостю предостовляется одноразовые гигиенические принадлежности, свежее выглаженное белое постельное белье, полотенца, белые халаты. Для комфортного проживания в квартире есть все: - Бытовая техника, кондиционер, микровалновка, фен, утюг, гладильная доска. Все новое. -WiFi, смарт ТВ, Рядом с ЖК расположен “ Magnum”, Тарговый центр \"Ush sunkar\", \"МЕЧТА\", банк, банкоматы, рынок.  Квартира не для проведения вечеринок. Просьба при себе иметь удостоверения личностию.  Примечание: при заезде берется депозит 5000т за сутки, а при выезде сумма депозита возвращается если в квартире все нормально и не обкуряно.  келген кезде әр күн үшін 5000т депозит алынады, және шығатын кезінде, егер пәтерде бәрі қалыпты болса және темекі шегшегілмеген болса, депозит сомасы қайтарылады.','6/1.webp,6/2.webp,6/3.webp,6/4.webp,6/5.webp,6/6.webp,6/7.webp','6/sm1.webp,6/sm2.webp,6/sm3.webp,6/sm4.webp,6/sm5.webp,6/sm6.webp,6/sm7.webp','Сайран');
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `useradditional`
--

DROP TABLE IF EXISTS `useradditional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `useradditional` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `comments` varchar(225) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId_idx` (`user_id`),
  CONSTRAINT `userId` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `useradditional`
--

LOCK TABLES `useradditional` WRITE;
/*!40000 ALTER TABLE `useradditional` DISABLE KEYS */;
INSERT INTO `useradditional` VALUES (1,1,'Smoking'),(2,1,'Drinking');
/*!40000 ALTER TABLE `useradditional` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `surname` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `iin` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `status` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `number` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `date_created` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `all_comments` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `blacklist` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'Аман','Шалбан','12312341',NULL,'498412803',NULL,NULL,1),(6,'Арсен Мынбаев','Number','112312','rzfsafadsa','+7 (776) 296 60 52','29.01.2024',NULL,0),(7,'dsad','dsad','safaf','fsasfsf','fasf','29.01.2024',NULL,0),(8,'ElderLord','Overlord','020214501513','new','+7 (776)296-6052','03.02.2024',NULL,0),(10,'Elder','Lord',NULL,'','87771112233','13.05.2024',NULL,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-24 12:32:27
