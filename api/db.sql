-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 21 mrt 2024 om 16:44
-- Serverversie: 10.4.32-MariaDB
-- PHP-versie: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `flexbosch`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `shop_id` int(11) NOT NULL,
  `day` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `shops`
--

CREATE TABLE `shops` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT 'Unknown',
  `image_front` varchar(255) NOT NULL DEFAULT 'no_image.png',
  `image_inside` varchar(255) NOT NULL DEFAULT 'no_image.png',
  `small_text` text NOT NULL,
  `big_text` text NOT NULL,
  `price` int(11) NOT NULL,
  `availability` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`availability`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `shops`
--

INSERT INTO `shops` (`id`, `name`, `image_front`, `image_inside`, `small_text`, `big_text`, `price`, `availability`) VALUES
(1, 'Purrfect Brew', 'purrfect-brew-front.png', 'purrfect-brew-inside.png', 'Welcome to Purrfect Brew, the coziest café in Den Bosch where coffee purrs and cats roam. This is more than just a coffee shop.', 'At Purrfect Brew, we believe that a good cup of coffee tastes better with a purring cat on your lap. Our café is home to a clowder of friendly, adoptable cats who roam freely and interact with our guests. Our menu features a variety of specialty coffees and teas, all sourced from local roasters and tea makers. The warm, inviting atmosphere, complete with comfortable seating and serene cat-themed décor, makes it the perfect spot for relaxation and rejuvenation. Whether you\'re here for a lazy afternoon latte or a quick espresso pick-me-up, our furry friends are always here to keep you company.', 13, '{\n    \"availability\": [\n        true, true, true, true, true, false, false\n    ],\n    \"must_reserve\": [\n        true, false, false, false, false, false, false\n    ],\n    \"places_available\": [\n        10, 10, 10, 10, 10, 0, 0\n    ]\n}'),
(2, 'Energize Espresso', 'energize-espresso-front.png', 'energize-espresso-inside.png', 'Energize Espresso is the ultimate destination in Den Bosch for coffee lovers who lead an active lifestyle. It\'s where fitness meets the finest brews.', 'Here at Energize Espresso, we\'re passionate about two things: coffee and exercise. Our unique concept combines a state-of-the-art gym with a high-quality coffee bar. We offer a selection of energy-boosting coffees and healthy snacks to fuel your workout and day. The space is designed for those who want to blend their fitness routine with socializing and relaxation. With our special post-workout coffee blends, protein-packed treats, and a vibrant, energizing atmosphere, we\'re here to ensure that your fitness journey is both enjoyable and caffeinated.', 7, '{\r\n    \"availability\": [\r\n        true, true, true, true, true, false, false\r\n    ],\r\n    \"must_reserve\": [\r\n        true, false, false, false, false, false, false\r\n    ],\r\n    \"places_available\": [\r\n        10, 10, 10, 10, 10, 0, 0\r\n    ]\r\n}'),
(3, 'Green Bean Oasis', 'green-been-oasis-front.png', 'green-been-oasis-inside.png', 'Green Bean Oasis is a lush, plant-filled coffee haven in the heart of Den Bosch, offering a tranquil escape with every sip.', 'Step into Green Bean Oasis, where the aroma of fresh coffee blends seamlessly with the scent of verdant greenery. Our café is a botanical wonderland, filled with a wide variety of plants and flowers that create a serene and peaceful environment. We specialize in organic, sustainably sourced coffee and offer a range of vegetarian and vegan treats. The natural décor, coupled with our commitment to eco-friendliness, provides a unique, calming experience. It’s the perfect spot to unwind, read a book, or simply enjoy the beauty of nature while sipping on your favorite coffee.', 3, '{\r\n    \"availability\": [\r\n        true, true, true, true, true, false, false\r\n    ],\r\n    \"must_reserve\": [\r\n        true, false, false, false, false, false, false\r\n    ],\r\n    \"places_available\": [\r\n        10, 10, 10, 10, 10, 0, 0\r\n    ]\r\n}'),
(4, 'Byte Brew', 'byte-brew-front.png', 'byte-brew-inside.png', 'Byte Brew is Den Bosch\'s cutting-edge café, where the love for coffee meets the world of modern technology.', 'At Byte Brew, we\'re revolutionizing the coffee experience with the latest in technology. Our café is equipped with high-speed Wi-Fi, power outlets, and the latest tech gadgets for our customers to use. The modern, sleek design is complemented by our innovative brewing methods, which include robotic baristas and AI-recommended coffee blends. Whether you\'re a tech enthusiast, a digital nomad, or just in need of a caffeine fix, Byte Brew offers a unique environment to work, socialize, and indulge in the digital world.', 0, '{\r\n    \"availability\": [\r\n        true, true, true, true, true, false, false\r\n    ],\r\n    \"must_reserve\": [\r\n        true, false, false, false, false, false, false\r\n    ],\r\n    \"places_available\": [\r\n        10, 10, 10, 10, 10, 0, 0\r\n    ]\r\n}'),
(5, 'Structura Café', 'structura-cafe-front.png', 'structura-cafe-inside.png', 'Structura Café is an architectural marvel, combining the love of coffee with awe-inspiring modern design in Den Bosch.', 'Nestled in the heart of Den Bosch, Structura Café is a tribute to modern architecture. Our café is not just a place to enjoy coffee; it\'s an experience that stimulates both the palate and the eyes. The building is a masterpiece of contemporary design, featuring clean lines, open spaces, and innovative use of materials. Inside, you\'ll find a selection of fine coffees and pastries, all served in a setting that feels like a walk through an art gallery. It’s the perfect destination for those who appreciate the finer things in life – great coffee and stunning design.', 10, '{\r\n    \"availability\": [\r\n        true, true, true, true, true, false, false\r\n    ],\r\n    \"must_reserve\": [\r\n        true, false, false, false, false, false, false\r\n    ],\r\n    \"places_available\": [\r\n        10, 10, 10, 10, 10, 0, 0\r\n    ]\r\n}'),
(6, 'Industrial Grind', 'industrial-grind-front.png', 'industrial-grind-inside.png', 'Industrial Grind is a unique, rustic coffee spot in Den Bosch, set in a repurposed factory hall blending industrial charm with top-notch coffee.', 'Step into Industrial Grind, where the rich history of Den Bosch\'s industrial past meets the modern coffee culture. Located in a beautifully converted factory hall, our café retains the industrial aesthetic with exposed brick, steel beams, and vintage decor. The spacious interior provides a relaxed, open atmosphere, perfect for casual meetings or simply enjoying a book. Our menu features robust, flavorful coffees and artisanal snacks, all made with locally sourced ingredients. Industrial Grind is more than a coffee shop; it\'s a tribute to the city\'s heritage, offering a unique and memorable coffee experience', 1, '{\r\n    \"availability\": [\r\n        true, true, true, true, true, false, false\r\n    ],\r\n    \"must_reserve\": [\r\n        true, false, false, false, false, false, false\r\n    ],\r\n    \"places_available\": [\r\n        10, 10, 10, 10, 10, 0, 0\r\n    ]\r\n}');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `shops`
--
ALTER TABLE `shops`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT voor een tabel `shops`
--
ALTER TABLE `shops`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
