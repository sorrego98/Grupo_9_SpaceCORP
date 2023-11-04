/* -------------------------------------------- BASE STRUCTURE -------------------------------------------- */
DROP DATABASE IF EXISTS air_sound_studio;
CREATE DATABASE air_sound_studio;
USE air_sound_studio;

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `role_name` varchar(100) COLLATE utf8_unicode_ci NOT null,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) COLLATE utf8_unicode_ci NOT null,
  `last_name` varchar(100) COLLATE utf8_unicode_ci NOT null,
  `user_name` varchar(100) COLLATE utf8_unicode_ci NOT null,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT null,
  `password` varchar(1000) COLLATE utf8_unicode_ci NOT null,
  `image_profile` varchar(1000) COLLATE utf8_unicode_ci default 'avatar-1692148831564.jpg',
  `role_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_role_id_foreign` (`role_id`),
  CONSTRAINT `users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)  
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT null,
  PRIMARY KEY (`id`)  
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `sub_categories`;
CREATE TABLE `sub_categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT null,
  `description` varchar(500) COLLATE utf8_unicode_ci,
  `cat_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sub_categories_cat_id_foreign` (`cat_id`),
  CONSTRAINT `sub_categories_cat_id_foreign` FOREIGN KEY (`cat_id`) REFERENCES `categories` (`id`)  
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `product_prices`;
CREATE TABLE `product_prices` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT null,
  PRIMARY KEY (`id`)   
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT null,
  `description` varchar(900) COLLATE utf8_unicode_ci,
  `image` varchar(1000) COLLATE utf8_unicode_ci default 'product-1691548445770.jpg' ,  
  `price_id` int(10) unsigned NOT null,  
  `price` decimal(30,2) COLLATE utf8_unicode_ci, 
  `status` boolean COLLATE utf8_unicode_ci NOT null,
  `subcat_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `products_price_id_foreign` (`price_id`),
  key `products_subcat_id_foreign` (`subcat_id`),
  CONSTRAINT `products_price_id_foreign` FOREIGN KEY (`price_id`) REFERENCES `product_prices` (`id`),
  constraint `products_subcat_id_foreign` FOREIGN KEY (`subcat_id`) REFERENCES `sub_categories` (`id`)   
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `user_cart_products`;
CREATE TABLE `user_cart_products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int(10) unsigned NOT NULL,
  `id_product` int(10) unsigned NOT NULL,
  `quantity` int(100) unsigned NOT NULL,
  `created_at` TimeStamp NULL DEFAULT NULL,
  `modified_at` TimeStamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_cart_products_id_user_foreign` (`id_user`),
  KEY `user_cart_products_id_product_foreign` (`id_product`),
  CONSTRAINT `user_cart_products_id_user_foreign` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  CONSTRAINT `user_cart_products_id_product_foreign` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `user_sales`;
CREATE TABLE `user_sales` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int(10) unsigned NOT NULL,
  `id_product` int(10) unsigned NOT NULL,
  `quantity` int(100) unsigned NOT NULL,
  `total_price` decimal(60,2) unsigned NOT NULL,
  `created_at` TimeStamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_sales_id_user_foreign` (`id_user`),
  KEY `user_sales_id_product_foreign` (`id_product`),
  CONSTRAINT `user_sales_id_user_foreign` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  CONSTRAINT `user_sales_id_product_foreign` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


DROP TABLE IF EXISTS `user_fav_products`;
CREATE TABLE `user_fav_products` (
  `id_user` int(10) unsigned NOT NULL,
  `id_product` int(10) unsigned NOT null,
  PRIMARY KEY (`id_user`,`id_product`),
  KEY `user_fav_products_id_user_foreign` (`id_user`),
  KEY `user_fav_products_id_product_foreign` (`id_product`),
  CONSTRAINT `user_fav_products_id_user_foreign` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  CONSTRAINT `user_fav_products_id_product_foreign` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `galeries`;
CREATE TABLE `galeries` (
  `id` int(100) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT null,
  `image` varchar(1000) COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`) 
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `members`;
CREATE TABLE `members` (
  `id` int(100) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT null,
  `job_name` varchar(100) COLLATE utf8_unicode_ci NOT null,
  `image` varchar(1000) COLLATE utf8_unicode_ci,
  `instagram_name` varchar(100) COLLATE utf8_unicode_ci NOT null,
  `instagram_url` varchar(100) COLLATE utf8_unicode_ci NOT null,
  PRIMARY KEY (`id`) 
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `productions`;
CREATE TABLE `productions` (
  `id` int(100) unsigned NOT NULL AUTO_INCREMENT,
  `song_title` varchar(100) COLLATE utf8_unicode_ci NOT null,
  `artist_name` varchar(100) COLLATE utf8_unicode_ci NOT null,
  `youtube_url` varchar(100) COLLATE utf8_unicode_ci NOT null,
  PRIMARY KEY (`id`) 
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;