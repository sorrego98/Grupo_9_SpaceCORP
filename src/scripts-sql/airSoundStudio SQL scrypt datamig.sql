/* -------------------------------------------- DATA MIGRATION -------------------------------------------- */
INSERT INTO `roles` (`role_name`)  VALUES 
('ADMINISTRADOR'),('EMPLEADO'),('USUARIO');

INSERT INTO `users` (`first_name`,`last_name`,`user_name`,`email`,`password`,`image`,`role_id`) VALUES
('Sebastián','Orrego','M.García','mg@gmail.com','$2a$10$w7X6Xdkx2yYUpfuX6lvKaO6XqgTCYQsp7iMyNM6dZ54V/mAs6p3sG','Marciano.png',1),
('Florencia','Guede','florguede','florenciaguede@gmail.com','$2a$10$ZjTDZd/8B4QakaPS9HNoO.P3cF0QHH/VeSBXUtfAshaX7OPb/WWc2','flor.jpg',2),
('Carlos','Echegaray','carloseche','carlos.charlex@gmail.com','$2a$10$Bi/JviMO/LYmrEwkOaRJBeFXd0kQSVUv1csyO9qn5Me3xKEVQUzEa','missing.jpg',2),
('SampleName','','SampleLastName','sample@sample.com','$2a$10$Bi/JviMO/LYmrEwkOaRJBeFXd0kQSVUv1csyO9qn5Me3xKEVQUzEa','avatar-1697761245246.jpg',3),
('Andrés','Amortegui','andresamor','andres.amortegui@gmail.com','$2a$10$w7X6Xdkx2yYUpfuX6lvKaO6XqgTCYQsp7iMyNM6dZ54V/mAs6p3sG','avatar-1692148831564.jpg',3),
('Julián','Díaz','juliandiaz','andres.amortegui@gmail.com','$2a$10$w7X6Xdkx2yYUpfuX6lvKaO6XqgTCYQsp7iMyNM6dZ54V/mAs6p3sG','gen.png',3);

INSERT INTO `categories` (`name`) VALUES 
('Clases'), -- 1
('Espacios físicos'), -- 2
('Grabación a Distancia'), -- 3
('Grabación de Audio'), -- 4
('Transcripciones'), -- 5
('Proyectos Musicales'), -- 6
('Ingeniería de Sonido'); -- 7

INSERT INTO `sub_categories`  (`name`,`description`, `cat_id`)  values
('Instrumentos',
'Nuestras clases te ayudarán a crecer como músico tanto si eres principiante como un múscio experimentado. ¡Reserva tu clase ahora y comienza tu viaje musical con nosotros!'
,1), -- 1
('Teoría y Producción',
'Descubre y desarrolla tu potencial musical a través de nuestras clases personalizadas. Aprende teoría musical, tecnica instrumental o composición en un ambiente interactivo y divertido. ¡Reserva tu clase ahora y comienza tu viaje musical con nosotros!' ,1), -- 2
('Sala de Ensayos',
'Reserva sesiones flexibles y aprovecha un entorno propicio para la creatividad y la colaboración. ¡Haz que tu música cobre vida en nuestra sala de ensayos!'
,2), -- 3
('Instrumentos Percusivos',
'Utiliza nuestro servicio de grabación a distancia y nuestro equipo de trabajo se encargara de grabar las pistas según tus especificaciones. ¡Deja que nuestro equipo haga realidad tu musica!'
,3), -- 4
('Vientos, Cuerdas, Coros, Teclados',
'Haz realidad tu proyecto musical sin necesidad de tener musicos propios. Obtén grabaciones profesionales sin complicaciones. ¡Deja que nuestro equipo haga realidad tu musica!'
,3), -- 5
('Captura de Instrumentos',
'Contamos con un equipo experto y equipos de grabacion de última generación. Confía en nosotros para capturar tu sonido de manera excepcional.'
,4), -- 6 
('Captura de Voces',
'Nuestro servicio de grabación de audio te ofrece resultados profesionales y de alta calidad. '
,4), -- 7
('Foley',
'Ya sea que necesites grabar voces, instrumentos, foley u otros sonidos, te brindaremos asistencia tecnica y un entorno óptimo para lograr el mejor sonido posible.'
,4), -- 8
('Propiedad Intelectual',
'Confía en nosotros para obtener la documentacion necesaria y proteger tu propiedad intelectual.'
,5), -- 9
('Producción Musical',
'Trabajaremos juntos en cada etapa, desde la grabación hasta la mezcla y masterización. Nuestro equipo experimentado te guiará en la selección de sonidos, la instrumentación y la creación de arreglos.'
,6), -- 10
('Beatmaker',
'Nuestro equipo de talentosos productores te brindara ritmos originales y de alta calidad que se ajusten a tu estilo musical'
,6), -- 11
('Masterización',
' Nuestro equipo experto mejorará la calidad y el sonido de tus canciones, asegurándose de que suenen profesionales y competitivas.'
,7), -- 12
('Mezcla',
'Trabajaremos juntos para asegurarnos de que la mezcla refleje tu vision artística y logre el máximo potencial de tus grabaciones. Obtén una mezcla profesional y púlida que hara que tu música se destaque.'
,7); -- 13


INSERT INTO `product_prices` (`name`)  VALUES 
('por hora'),('por track'),('por canción'),('por proyecto'),('por guión melódico');

INSERT INTO `products` (`name`, `image` ,`description`, `price_id`, `price`, `status`, `subcat_id`) VALUES 
('Guitarra','guitarclass.jpg','Agenda tu clase de guitarra y desarrolla tu potencial musical con nuestros profesores calificados',1,15.00,1,1),
('Piano/Teclado','keyclass.jpg','Agenda tu clase de piano/teclado y desarrolla tu potencial musical con nuestros profesores calificados',1,15.00,1,1),
('Producción Musical','produccion.jpg','Confía en nosotros para llevar tu musica al siguiente nivel y crear una producción que destaque',1,15.00,1,2),
('Técnica Vocal','vocalclss.jpg','Agenda tu clase de técnica vocal y desarrolla tu potencial musical con nuestros profesores calificados',1,15.00,1,2),
('Teoría Musical','tm.jpg','Aprende de teoría musical de la mano de nuestros profesores calificados',1,15.00,1,2),
('Sala de Ensayos','ensayadero.jpg','Prepárate para actuaciones increíbles en nuestra sala de ensayos equipada con todo lo necesario. Disfruta de un espacio acogedor y equipado con equipos de alta calidad para ensayar con tu banda. Reserva sesiones flexibles y aprovecha un entorno propicio para la creatividad y la colaboración. ¡Haz que tu música cobre vida en nuestra sala de ensayos!',1,15.00,1,3),
('Instrumentos Percusivos','drum.jpg','Haz realidad tu proyecto musical sin necesidad de tener músicos propios. Utiliza nuestro servicio de grabación a distancia y nuestro equipo de trabajo se encargará de grabar las pistas según tus especificaciones. Obtén grabaciones profesionales sin complicaciones. ¡Deja que nuestro equipo haga realidad tu música!',2,100.00,1,4),
('Vientos, Cuerdas, Coros, Teclados','captura.jpg','Haz realidad tu proyecto musical sin necesidad de tener músicos propios. Utiliza nuestro servicio de grabación a distancia y nuestro equipo de trabajo se encargará de grabar las pistas según tus especificaciones. Obtén grabaciones profesionales sin complicaciones. ¡Deja que nuestro equipo haga realidad tu música!',2,50.00,1,5),
('Captura de Instrumentos','c1.jpg','Si necesitas grabar instrumentos te brindamos asistencia tecnica y un entorno óptimo para lograr el mejor sonido posible',1,15.00,1,6),
('Captura de Voces','c2.jpg','Si necesitas grabar voces te brindamos asistencia tecnica y un entorno óptimo para lograr el mejor sonido posible',1,15.00,1,7),
('Foley','fx.jpg','Si necesitas grabar foley te brindamos asistencia tecnica y un entorno óptimo para lograr el mejor sonido posible',4,NULL,1,8),
('Trancripción de Guiones Melódicos','trascripcion.jpg','Protege tus derechos de autor con nuestra transcripción de guiones melódicos. Convertimos tus melodías en partituras precisas y legibles para respaldar legalmente tu música. Confía en nosotros para obtener la documentación necesaria y proteger tu propiedad intelectual',5,15.00,1,9),
('Producción Musical','pm.jpg','Confía en nosotros para llevar tu música al siguiente nivel y crear una producción que destaque!',4,NULL,1,10),
('Beatmaker','beatmaker.jpg','Crea ritmos profesionales con nuestro servicio de Beatmaker. Nuestro equipo de talentosos productores te brindará ritmos originales y de alta calidad que se ajusten a tu estilo musical. Personalizamos los beats según tus preferencias y los entregamos en formato de alta calidad. Eleva tu música con nuestros ritmos creativos y profesionales.',4,NULL,1,11),
('Masterización','masterizacion.jpg','Destaca con confianza en cada reproducción y deja que tu música brille con nuestro servicio de masterización',3,120.00,1,12),
('Mezcla','mezcla.jpg','Confía en nuestro servicio de mezcla para lograr un sonido equilibrado y atractivo de la mano de nuestro equipo de ingenieros de sonido',3,120.00,1,13);

INSERT INTO `galeries` (`name`, `image`)  VALUES 
('El azogue','azogue.jpg'),
('Desatormentándonos','desatormentandonos.jpg'),
('Batería','drum.jpg'),
('Jazzy','jazzy.jpg'),
('Sirenos','sirenos.jpg'),
('Trojan Records','trojan.jpg'),
('Invisible','invisible.jpg'),
('El Plan de la Mariposa','estadodeenlace.jpg'),
('La Triple Nelson','sed.jpg'),
('KJ','thenada.jpg');

INSERT INTO `members` (`name`, `job_name`, `image`, `instagram_name`, `instagram_url`)  VALUES 
('Camilo Pabón', 'CEO', 'chew.jpg', '@juancamilomusica', 'https://www.instagram.com/juancamilomusica/'),
('Jaison Muriel', 'Ingeniero de Sonido', 'ani.jpg', '@jaisonmuriel', 'https://www.instagram.com/jaisonmuriel/'),
('David Usma', 'Productor Musical', 'jar.jpg', '@david_usma', 'https://www.instagram.com/david_usma/');

INSERT INTO `productions` (`song_title`, `artist_name`, `youtube_url`)  VALUES 
('El Poeta Halley', 'Love of Lesbian', 'https://www.youtube-nocookie.com/embed/H7tbjuHHbsQ'),
('Cuento al Viento', 'Malena di Bello', 'https://www.youtube-nocookie.com/embed/lfeRc9tRQzM'),
('Quanuqueando', 'Divididos', 'https://www.youtube-nocookie.com/embed/7OlzxfSKjtI'),
('Buen Finde', 'La Mono Trio', 'https://www.youtube-nocookie.com/embed/ONvgGORQj8k'),
('No me Beses en la Boca', 'Kutxi Romero', 'https://www.youtube-nocookie.com/embed/Pcnsgs8G5fo'),
('Fin de Fiesta','Kevin Johsansen','https://www.youtube-nocookie.com/embed/VLqa3ekhmgE?si=d19sh92SOwSCriq9'),
('Canela','Cesar Mora','https://www.youtube-nocookie.com/embed/jlZ8BMqHowk?si=PxfkEAPEtBQrRUtM'),
('La Sed','La Triple Nelson','https://www.youtube-nocookie.com/embed/hgDKGopT-5o?si=I_LbeSbbjo7lRgTR'),
('Giros','Liliana Herrero','https://www.youtube-nocookie.com/embed/OzNFkhJ84l4?si=LpTfh_mDkQz7-8yr'),
('Viernes Otra Vez','Superlitio','https://www.youtube-nocookie.com/embed/ha7nF3h7oGw?si=fNpdOsfzU6tt143Y');