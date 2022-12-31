/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `comments` (
  `comment_date` date DEFAULT NULL,
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `image_id` int DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `user_id` (`user_id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `images` (`image_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `image_save` (
  `save_day` date DEFAULT NULL,
  `user_id` int NOT NULL,
  `image_id` int NOT NULL,
  PRIMARY KEY (`image_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `image_save_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `image_save_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `images` (`image_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `images` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `image_name` varchar(255) DEFAULT NULL,
  `URL` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `data_created` date DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`image_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `pass_word` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `comments` (`comment_date`, `comment_id`, `user_id`, `image_id`, `content`) VALUES
('2022-12-31', 23, 3, 50, 'lorem kiem tra thong tin');
INSERT INTO `comments` (`comment_date`, `comment_id`, `user_id`, `image_id`, `content`) VALUES
('2022-12-31', 24, 3, 50, 'lorem kiem tra thong tin');
INSERT INTO `comments` (`comment_date`, `comment_id`, `user_id`, `image_id`, `content`) VALUES
('2022-12-31', 25, 3, 50, 'lorem kiem tra thong tin');

INSERT INTO `image_save` (`save_day`, `user_id`, `image_id`) VALUES
('2022-12-31', 3, 51);


INSERT INTO `images` (`image_id`, `image_name`, `URL`, `description`, `data_created`, `user_id`) VALUES
(50, 'new image new', 'http://localhost:8080/api/image-management/upload/1672479096637_1 (33).jpg', 'anh khong dep', '2022-12-31', 3);
INSERT INTO `images` (`image_id`, `image_name`, `URL`, `description`, `data_created`, `user_id`) VALUES
(51, 'new image new', 'http://localhost:8080/api/image-management/upload/1672479637580_1 (33).jpg', 'anh khong dep', '2022-12-31', 3);
INSERT INTO `images` (`image_id`, `image_name`, `URL`, `description`, `data_created`, `user_id`) VALUES
(53, 'new image new', 'http://localhost:8080/api/image-management/upload/undefined', 'anh khong dep', '2022-12-31', 3);
INSERT INTO `images` (`image_id`, `image_name`, `URL`, `description`, `data_created`, `user_id`) VALUES
(54, 'new image new', 'http://localhost:8080/api/image-management/upload/1672482248357_1 (7).png', 'anh khong dep', '2022-12-31', 3),
(55, 'anh_dep', 'http://localhost:8080/api/image-management/upload/1672484754854_1 (15).jpg', 'anh dep', '2022-12-31', 3);

INSERT INTO `users` (`user_id`, `email`, `pass_word`, `full_name`, `age`, `avatar`) VALUES
(3, 'phongckm93@gmail.com', '$2b$10$xW3rPWQhSOTd.8gWb91jT.nFmiaJ7K13agMbnO/PKMHRX/Qnt64Cy', 'nguyen van nam', 29, 'http://localhost:8080/api/user-management/avatar/3/1672482149445_1 (15).png');
INSERT INTO `users` (`user_id`, `email`, `pass_word`, `full_name`, `age`, `avatar`) VALUES
(15, 'van_phong12@gmail.com', '$2b$10$f5xoD4Y.4I3wl9cJ4/jxv.qjxM2VYQmr7lIenl0sxaNlF9eqoaIwK', 'nguyen van ti', 12, NULL);
INSERT INTO `users` (`user_id`, `email`, `pass_word`, `full_name`, `age`, `avatar`) VALUES
(16, 'van_phong2@gmail.com', '$2b$10$eU08L0KpncEJuHjU6ETGb.0/VXKU4dzxy2Meu.9ZSlvonjsrg2a.q', 'nguyen van ti', 12, NULL);
INSERT INTO `users` (`user_id`, `email`, `pass_word`, `full_name`, `age`, `avatar`) VALUES
(17, 'phongckm933@gmail.com', '$2b$10$Z4sznp5tsW7dOohq2RijN.vNgJbi.V205sUNLfaXL2mf5sOsSFum2', 'string', 25, 'http://localhost:8080/api/user-management/avatar/17/1672484658100_1 (21).png');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;