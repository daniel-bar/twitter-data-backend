CREATE TABLE `user`.`config` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(15) NOT NULL,
  `status` BOOLEAN DEFAULT 1,
  `description` varchar(280) NOT NULL,
  `profile_picture_link` varchar(2048) NOT NULL,
  `following_count` int unsigned NOT NULL,
  `followers_count` int unsigned NOT NULL,
  `most_common_word` varchar(29) NOT NULL,
  `retweets_count` int unsigned NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNQIUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;