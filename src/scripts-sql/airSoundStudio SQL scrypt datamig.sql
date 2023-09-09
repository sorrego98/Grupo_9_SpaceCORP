/* -------------------------------------------- DATA MIGRATION -------------------------------------------- */
INSERT INTO `roles` (`role_name`)  VALUES 
('ADMINISTRADOR'),('EMPLEADO'),('USUARIO');

INSERT INTO `users` (`first_name`,`last_name`,`user_name`,`email`,`password`,`role_id`) VALUES
('Sebastián','Orrego','sebaorrego','mg@gmail.com','$2a$10$w7X6Xdkx2yYUpfuX6lvKaO6XqgTCYQsp7iMyNM6dZ54V/mAs6p3sG',1),
('Florencia','Guede','florguede','florenciaguede@gmail.com','$2a$12$95HkpVn0/n8XIuNy1kSv4OIl1NvSSHZ7SzyEIM7czC4fSf3cZm53u',2),
('Carlos','Echegaray','carloseche','carlos.charlex@gmail.com','$2a$12$95HkpVn0/n8XIuNy1kSv4OIl1NvSSHZ7SzyEIM7czC4fSf3cZm53u',2),
('Andrés','Amortegui','andresamor','andres.amortegui@gmail.com','$2a$10$w7X6Xdkx2yYUpfuX6lvKaO6XqgTCYQsp7iMyNM6dZ54V/mAs6p3sG',3),
('Julián','Díaz','juliandiaz','andres.amortegui@gmail.com','$2a$10$w7X6Xdkx2yYUpfuX6lvKaO6XqgTCYQsp7iMyNM6dZ54V/mAs6p3sG',3);

INSERT INTO `categories` (`name`) VALUES 
('Clases'), -- 1
('Espacios físicos'), -- 2
('Grabación a Distancia'), -- 3
('Grabación de Audio'), -- 4
('Transcripciones'), -- 5
('Proyectos Musicales'), -- 6
('Ingeniería de Sonido'); -- 7

INSERT INTO `sub_categories`  (`name`,`description`,`cat_id`)  values
('Instrumentos',
'Descubre y desarrolla tu potencial musical a través de nuestras clases personalizadas. Nuestros profesores expertos te guiarán en un viaje músical adaptado a tus necesidades y objetivos. Aprende teoría musical, tecnica instrumental, canto o composición en un ambiente interactivo y divertido. Tanto si eres principiante como si tienes experiencia, nuestras clases te ayudarán a crecer como músico. ¡Reserva tu clase ahora y comienza tu viaje musical con nosotros!'
,1), -- 1
('Teoría y Producción',
'Descubre y desarrolla tu potencial musical a través de nuestras clases personalizadas. Nuestros profesores expertos te guiarán en un viaje músical adaptado a tus necesidades y objetivos. Aprende teoría musical, tecnica instrumental, canto o composición en un ambiente interactivo y divertido. Tanto si eres principiante como si tienes experiencia, nuestras clases te ayudarán a crecer como músico. ¡Reserva tu clase ahora y comienza tu viaje musical con nosotros!'
,1), -- 2
('Sala de Ensayos',
'Preparate para actuaciones increíbles en nuestra sala de ensayos equipada con todo lo necesario. Disfruta de un espacio acogedor y equipado con equipos de alta calidad para ensayar con tu banda. Reserva sesiones flexibles y aprovecha un entorno propicio para la creatividad y la colaboración. ¡Haz que tu música cobre vida en nuestra sala de ensayos!'
,2), -- 3
('Instrumentos Percusivos',
'Haz realidad tu proyecto musical sin necesidad de tener musicos propios. Utiliza nuestro servicio de grabación a distancia y nuestro equipo de trabajo se encargara de grabar las pistas según tus especificaciones. Obtén grabaciones profesionales sin complicaciones. ¡Deja que nuestro equipo haga realidad tu musica!'
,3), -- 4
('Vientos, Cuerdas, Coros, Teclados',
'Haz realidad tu proyecto musical sin necesidad de tener musicos propios. Utiliza nuestro servicio de grabación a distancia y nuestro equipo de trabajo se encargara de grabar las pistas según tus especificaciones. Obtén grabaciones profesionales sin complicaciones. ¡Deja que nuestro equipo haga realidad tu musica!'
,3), -- 5
('Captura de Instrumentos',
'Nuestro servicio de grabación de audio te ofrece resultados profesionales y de alta calidad. Contamos con un equipo experto y equipos de grabacion de última generación. Ya sea que necesites grabar voces, instrumentos, foley u otros sonidos, te brindaremos asistencia tecnica y un entorno óptimo para lograr el mejor sonido posible. Confíaa en nosotros para capturar tu sonido de manera excepcional.'
,4), -- 6 
('Captura de Voces',
'Nuestro servicio de grabación de audio te ofrece resultados profesionales y de alta calidad. Contamos con un equipo experto y equipos de grabacion de última generación. Ya sea que necesites grabar voces, instrumentos, foley u otros sonidos, te brindaremos asistencia tecnica y un entorno óptimo para lograr el mejor sonido posible. Confíaa en nosotros para capturar tu sonido de manera excepcional.'
,4), -- 7
('Foley',
'Nuestro servicio de grabación de audio te ofrece resultados profesionales y de alta calidad. Contamos con un equipo experto y equipos de grabacion de última generación. Ya sea que necesites grabar voces, instrumentos, foley u otros sonidos, te brindaremos asistencia tecnica y un entorno óptimo para lograr el mejor sonido posible. Confíaa en nosotros para capturar tu sonido de manera excepcional.'
,4), -- 8
('Propiedad Intelectual',
'Protege tus derechos de autor con nuestra transcripción de guiones melódicos. Convertimos tus melodías en partituras precisas y legibles para respaldar legalmente tu musica. Confía en nosotros para obtener la documentacion necesaria y proteger tu propiedad intelectual.'
,5), -- 9
('Producción Musical',
'Haz realidad tus ideas musicales con nuestro servicio de produccion. Trabajaremos juntos en cada etapa, desde la grabación hasta la mezcla y masterización. Nuestro equipo experimentado te guiará en la selección de sonidos, la instrumentación y la creación de arreglos. Utilizaremos equipos profesionales y tecnología avanzada para garantizar la más alta calidad. Confía en nosotros para llevar tu música al siguiente nivel y crear una producción que destaque.'
,6), -- 10
('Beatmaker',
'Crea ritmos profesionales con nuestro servicio de Beatmaker. Nuestro equipo de talentosos productores te brindara ritmos originales y de alta calidad que se ajusten a tu estilo musical. Personalizamos
los beats segun tus preferencias y los entregamos en formato de alta calidad.
Eleva tu musica con nuestros ritmos creativos y profesionales.'
,6), -- 11
('Masterización',
'Confía en nuestro servicio de masterización para llevar tu música al siguiente nivel. Nuestro equipo experto mejorará la calidad y el sonido de tus canciones, asegurándose de que suenen profesionales y competitivas. Destaca con confianza en cada reproduccion y deja que tu música brille con nuestro servicio de masterización.'
,7), -- 12
('Mezcla',
'Confía en nuestro servicio de mezcla para lograr un sonido equilibrado y atractivo. Nuestro equipo de ingenieros de sonido utilizará técnicas profesionales para combinar y resaltar cada elemento de tu musica. Trabajaremos juntos para asegurarnos de que la mezcla refleje tu vision artística y
logre el máximo potencial de tus grabaciones. Obtén una mezcla profesional y púlida que hara que tu música se destaque.'
,7); -- 13


INSERT INTO `product_prices` (`name`)  VALUES 
('por hora'),('por track'),('por canción'),('por proyecto'),('por guión melódico');

INSERT INTO `products` (`name`, `price_id`, `price`, `status`,`cat_id`, `subcat_id`) VALUES 
('Guitarra',1,15.00,1,1,1),
('Piano/Teclado',1,15.00,1,1,1),
('Producción Musical',1,15.00,1,1,2),
('Técnica Vocal',1,15.00,1,1,2),
('Teoría Musical',1,15.00,1,1,2),
('Sala de Ensayos',1,15.00,1,2,3),
('Instrumentos Percusivos',2,100.00,1,3,4),
('Vientos, Cuerdas, Coros, Teclados',2,50.00,1,3,5),
('Captura de Instrumentos',1,15.00,1,4,6),
('Captura de Voces',1,15.00,1,4,7),
('Foley',4,NULL,1,4,8),
('Trancripción de Guiones Melódicos',5,15.00,1,5,9),
('Producción Musical',4,NULL,1,6,10),
('Beatmaker',4,NULL,1,6,11),
('Masterización',3,120.00,1,7,12),
('Mezcla',3,120.00,1,7,13);


