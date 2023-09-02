/* -------------------------------------------- BASE STRUCTURE -------------------------------------------- */
DROP DATABASE IF EXISTS air_sound_studio;
CREATE DATABASE air_sound_studio;
USE air_sound_studio;

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `role_name` varchar(100) COLLATE utf8_unicode_ci NOT null,
  `created_at` TimeStamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TimeStamp NULL DEFAULT NULL,
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
  `image_profile` varchar(1000) COLLATE utf8_unicode_ci,
  `role_id` int(10) unsigned NOT NULL,
  `created_at` TimeStamp DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TimeStamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `users_role_id_foreign` (`role_id`),
  CONSTRAINT `users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)  
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT null,
  `created_at` TimeStamp DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TimeStamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)  
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `sub_categories`;
CREATE TABLE `sub_categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT null,
  `cat_id` int(10) unsigned NOT NULL,
  `created_at` TimeStamp DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TimeStamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sub_categories_cat_id_foreign` (`cat_id`),
  CONSTRAINT `sub_categories_cat_id_foreign` FOREIGN KEY (`cat_id`) REFERENCES `categories` (`id`)  
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `product_prices`;
CREATE TABLE `product_prices` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT null,
  `created_at` TimeStamp DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TimeStamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)   
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT null,
  `description` varchar(500) COLLATE utf8_unicode_ci NOT null,
  `image` varchar(1000) COLLATE utf8_unicode_ci DEFAULT 'product-1691548445770.jpg',  
  `price_id` int(10) unsigned NOT null,  
  `price` decimal(30,2) COLLATE utf8_unicode_ci, 
  `status` boolean COLLATE utf8_unicode_ci NOT null,
  `cat_id` int(10) unsigned NOT NULL,
  `subcat_id` int(10) unsigned NOT NULL,
  `created_at` TimeStamp DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TimeStamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `products_price_id_foreign` (`price_id`),
  KEY `products_cat_id_foreign` (`cat_id`),
  key `products_subcat_id_foreign` (`subcat_id`),
  CONSTRAINT `products_price_id_foreign` FOREIGN KEY (`price_id`) REFERENCES `product_prices` (`id`),
  CONSTRAINT `products_cat_id_foreign` FOREIGN KEY (`cat_id`) REFERENCES `categories` (`id`),
  constraint `products_subcat_id_foreign` FOREIGN KEY (`subcat_id`) REFERENCES `sub_categories` (`id`)   
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `user_cart_products`;
CREATE TABLE `user_cart_products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int(10) unsigned NOT NULL,
  `id_product` int(10) unsigned NOT NULL,
  `quantity` int(100) unsigned NOT NULL,
  `created_at` TimeStamp DEFAULT CURRENT_TIMESTAMP,
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
  `created_at` TimeStamp DEFAULT CURRENT_TIMESTAMP,
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
  `created_at` TimeStamp DEFAULT CURRENT_TIMESTAMP,
  `modified_at` TimeStamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_user`,`id_product`),
  KEY `user_fav_products_id_user_foreign` (`id_user`),
  KEY `user_fav_products_id_product_foreign` (`id_product`),
  CONSTRAINT `user_fav_products_id_user_foreign` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  CONSTRAINT `user_fav_products_id_product_foreign` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/* -------------------------------------------- DATA MIGRATION -------------------------------------------- */

INSERT INTO `roles` VALUES 
(NULL,'ADMINISTRADOR',NULL,NULL),(NULL,'EMPLEADO',NULL,NULL),(NULL,'USUARIO',NULL,NULL);

INSERT INTO `users` VALUES 
(NULL,'Florencia','Guede','florguede','florenciaguede@gmail.com','$2a$12$95HkpVn0/n8XIuNy1kSv4OIl1NvSSHZ7SzyEIM7czC4fSf3cZm53u','avatar-1692286056774.jpg',1,NULL,NULL),
(NULL,'Sebastián','Orrego','sebaorrego','mg@gmail.com','$2a$10$w7X6Xdkx2yYUpfuX6lvKaO6XqgTCYQsp7iMyNM6dZ54V/mAs6p3sG','avatar-1692286056774.jpg',1,NULL,NULL),
(NULL,'Carlos','Echegaray','carloseche','carlos.charlex@gmail.com','$2a$12$95HkpVn0/n8XIuNy1kSv4OIl1NvSSHZ7SzyEIM7czC4fSf3cZm53u','avatar-1692286056774.jpg',1,NULL,NULL),
(NULL,'Andrés','Amortegui','andresamor','andres.amortegui@gmail.com','$2a$10$w7X6Xdkx2yYUpfuX6lvKaO6XqgTCYQsp7iMyNM6dZ54V/mAs6p3sG','avatar-1692286056774.jpg',1,NULL,NULL),
(NULL,'Julián','Díaz','juliandiaz','andres.amortegui@gmail.com','$2a$10$w7X6Xdkx2yYUpfuX6lvKaO6XqgTCYQsp7iMyNM6dZ54V/mAs6p3sG','avatar-1692286056774.jpg',1,NULL,NULL);

INSERT INTO `categories` VALUES 
(NULL,'clases de música',NULL,NULL),(NULL,'grabación de audio',NULL,NULL),(NULL,'grabación a distancia',NULL,NULL),(NULL,'varios',NULL,NULL);

INSERT INTO `sub_categories` VALUES 
(NULL,'piano/teclado',1,NULL,NULL),(NULL,'guitarra',1,NULL,NULL),(NULL,'producción musical',1,NULL,NULL),(NULL,'técnica vocal',1,NULL,NULL),(NULL,'teoría musical',1,NULL,NULL),
(NULL,'captura de instrumentos',2,NULL,NULL),(NULL,'captura de voces',2,NULL,NULL),(NULL,'foley',2,NULL,NULL),
(NULL,'instrumentos percusivos',3,NULL,NULL),(NULL,'vientos, cuerdas, coros, teclados',3,NULL,NULL),
(NULL,'beatmaker',4,NULL,NULL),(NULL,'ensayadero',4,NULL,NULL),(NULL,'mezcla',4,NULL,NULL),(NULL,'masterización',4,NULL,NULL),(NULL,'producción musical',4,NULL,NULL),(NULL,'transcripción de guiones melódicos',4,NULL,NULL);

INSERT INTO `product_prices` VALUES 
(NULL,'por hora',NULL,NULL),(NULL,'por track',NULL,NULL),(NULL,'por canción',NULL,NULL),(NULL,'por proyecto',NULL,NULL),(NULL,'por guión melódico',NULL,NULL);

INSERT INTO `products` VALUES 
(NULL,'clases de música','dummy description','clases-musica.jpg',1,15.00,1,1,1,NULL,NULL),
(NULL,'clases de música','dummy description','clases-musica.jpg',1,15.00,1,1,2,NULL,NULL),
(NULL,'clases de música','dummy description','clases-musica.jpg',1,15.00,1,1,3,NULL,NULL),
(NULL,'clases de música','dummy description','clases-musica.jpg',1,15.00,1,1,4,NULL,NULL),
(NULL,'clases de música','dummy description','clases-musica.jpg',1,15.00,1,1,5,NULL,NULL),
(NULL,'grabación','dummy description','clases-musica.jpg',1,15.00,1,2,1,NULL,NULL),
(NULL,'grabación','dummy description','clases-musica.jpg',1,15.00,1,2,2,NULL,NULL),
(NULL,'grabación','dummy description','clases-musica.jpg',4,null,1,2,3,NULL,NULL),
(NULL,'grabación','dummy description','clases-musica.jpg',2,100.00,1,3,1,NULL,NULL),
(NULL,'grabación','dummy description','clases-musica.jpg',2,50.00,1,3,2,NULL,NULL),
(NULL,'beatmaker','dummy description','beatmaker.jpg',4,null,1,4,1,NULL,NULL),
(NULL,'ensayadero','dummy description','ensayadero.jpg',1,10.00,1,4,2,NULL,NULL),
(NULL,'mezcla','dummy description','mezcla.jpg',3,120.00,1,4,3,NULL,NULL),
(NULL,'masterización','dummy description','masterizacion.jpg',3,120.00,1,4,4,NULL,NULL),
(NULL,'producción musical','dummy description','produccion.jpg',4,null,1,4,5,NULL,NULL),
(NULL,'transcripción de guiones melódicos','dummy description','transcripcion.jpg',5,15.00,1,3,6,NULL,NULL);