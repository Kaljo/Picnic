
INSERT INTO `groups` (`name`, `password`, `location`, `date`, `id`) VALUES
('Kamenica', '1234', 'Kamenica', '2016-09-13', 1),
('Mega Party', '456', 'Sofia', '2016-09-15', 2),
('Ludilo', '1234', 'Kamenica', '2016-09-13', 3),
('Vesela grupa', 'neshko', 'Lernraum', '2016-09-23', 4),
('Zurka', 'puf', 'Karlsplatz', '2016-09-24', 5);

INSERT INTO `users` (`id`, `email`, `password`, `name`, `city`, `country`, `pic`) VALUES
(1, 'ani@abg.bg', 'an', 'Ani Petkova', 'Sofia', 'Bulgaria', '/img/neli.png'),
(2, 'niki_mouse@yahoo.com', 'an', 'Nikola Stevanovic', 'Kraljevo', 'Serbien', '/img/lukas.jpg'),
(3, 'petkova_nelly@yahoo.com', 'nel', 'Neli Petkova', 'Sofia', 'Bulgaria', '/img/neli.png'),
(4, 'ajla@yahoo.com', 'a', 'Ajla Kasic', 'Sarajevo', 'Bosnia', '/img/ajla.png'),
(5, 'name', '9', 'Name ', 'Vienna', 'Austria', '/img/user.png'),
(87, 'Gospoja', '123456', 'Unknown', 'Unknown', 'Unknown', '/img/user.png'),
(176, 'Kuch', '123456', 'Unknown', 'Unknown', 'Unknown', '/img/user.png'),
(178, 'Kuce', '123456', 'Unknown', 'Unknown', 'Unknown', '/img/user.png'),
(200, 'huh', '123456', 'Unknown', 'Unknown', 'Unknown', '/img/user.png'),
(201, 'huh', '123456', 'Unknown', 'Unknown', 'Unknown', '/img/user.png'),
(202, 'op', '123456', 'Unknown', 'Unknown', 'Unknown', '/img/user.png');

INSERT INTO `memberships` (`userid`, `groupid`, `admin`) VALUES
(1, 1, '1'),
(2, 2, '0'),
(2, 3, '0');


INSERT INTO `notifications` (`id`, `type`, `money_amount`, `sender_id`, `receiver_id`, `group_id`) VALUES
(1, 'debt', 20, 4, 2, 3),
(4, 'invitation', 0, 1, 2, 3),
(5, 'debt', 100, 87, 2, 2);

INSERT INTO products(buyer_userID,groupID,productPrice,productName)
VALUES(1, 11, 19.54, 'kokakola')


