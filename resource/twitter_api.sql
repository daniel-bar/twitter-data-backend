CREATE TABLE `twitterapi`.`user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(15) NOT NULL,
  `status` tinyint unsigned NOT NULL DEFAULT 0,
  `description` varchar(280),
  `profile_picture_link` varchar(2048),
  `following_count` int unsigned,
  `followers_count` int unsigned,
  `most_common_word` varchar(29),
  `retweets_count` int unsigned,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNQIUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;