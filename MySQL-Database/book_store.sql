DROP DATABASE IF EXISTS `book_store`;
CREATE DATABASE `book_store` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE book_store;
SET NAMES utf8mb4;

DROP TABLE IF EXISTS `book`;
CREATE TABLE IF NOT EXISTS `book` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `author` VARCHAR(255) NULL,
    `price` DOUBLE NOT NULL,
    `sales` BIGINT NULL,
    `publisher` VARCHAR(255) NULL,
    `author_description` TEXT NULL,
    `book_description` TEXT NULL,
    `cover` VARCHAR(255) NOT NULL
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

BEGIN;
INSERT INTO book (id, title, author, price, sales, publisher, author_description, book_description, cover) VALUES (1, 'C++ Primer 中文版(第5版)', 'Stanley B.Lippman', 57.5, 8, '电子工业出版社', '       这本久负盛名的 C++ 经典教程，时隔八年之久，终迎来史无前例的重大升级。除令全球无数程序员从中受益，甚至为之迷醉的——C++ 大师 Stanley B. Lippman 的丰富实践经验，C++标准委员会原负责人 Josée Lajoie 对C++标准的深入理解，以及C+ + 先驱 Barbara E. Moo 在 C++教学方面的真知灼见外,更是基于全新的 C++11标准进行了全面而彻底的内容更新。非常难能可贵的是，本书所有示例均全部采用C++11 标准改写，这在经典升级版中极其罕见——充分体现了 C++ 语言的重大进展及其全面实践。书中丰富的教学辅助内容、醒目的知识点提示，以及精心组织的编程示范，让这本书在 C++ 领域的权威地位更加不可动摇。无论是初学者入门，或是中、高级程序员提升，本书均为不容置疑的首选。', '       Stanley B. Lippman目前是微软公司 Visual C++ 团队的架构师。他从1984年开始在贝尔实验室与C++的设计者Bjarne Stroustrup一起从事C++的设计与开发。他在迪士尼和梦工厂从事动画制作，还担任过JPL的高级顾问。他还著有Inside the C++ Object Model。\\n       Josée Lajoie曾经是IBM加拿大研究中心C/C++编译器开发团队的成员，在ISO C++标准委员会工作了7年，担任过ISO核心语言工作组的主席和C++ Report杂志的专栏作家。\\n       Barbara E. Moo是拥有25年软件经验的独立咨询顾问。在AT&T，她与Stroustrup、Lippman一起管理过复杂的C++开发项目。她和Andrew Koenig合著了Accelerated C++和Ruminations on C++。', 'book1.png');
INSERT INTO book (id, title, author, price, sales, publisher, author_description, book_description, cover) VALUES (2, '地 关于地球的运动', '鱼丰', 83.2, 2, '九州出版社', '       從小對繪畫有強大的興趣，中學時受到《爆漫王》影響，立志成為漫畫家，於2017年開始投稿。\\n       在週刊少年マガジン新人漫畫賞中入選佳作後，2018年開始了第一部連載作品《百米》(暫譯)。2020年開始連載《地。-關於地球的運動-》，以地動說為主軸，講述對知識渴望與傳承。       第26回手塚治蟲文化賞，史上最年輕得獎者。', '       「到底要付出什麼，才能瞭解這世上的一切——？」\\n       15世紀前期的Ｐ王國，拉斐爾是百年難的一見的神童，預計在大學主修神學。\\n       因緣際會下，遇見了因從事「禁止研究」而被折磨拷問的異教徒赫伯特。\\n       他的工作與宗教正式認可的「地心說」背道而馳，\\n       因此，赫伯特被認為是應該懺悔的異端者。\\n       拉斐爾起初否定了赫伯特的理論，\\n       但他理性的性格以及對天文學的好奇，\\n       逐漸被「日心說」的理性之美所吸引……', 'book2.jpg');
INSERT INTO book (id, title, author, price, sales, publisher, author_description, book_description, cover) VALUES (3, '艾欧泽亚百科全书', 'Square Enix', 255, 0, '出版社', null, null, 'book3.jpg');
INSERT INTO book (id, title, author, price, sales, publisher, author_description, book_description, cover) VALUES (4, '穆斯林的葬礼', '霍达', 49, 0, null, null, null, 'book4.jpg');
INSERT INTO book (id, title, author, price, sales, publisher, author_description, book_description, cover) VALUES (5, '射雕英雄传', '金庸', 94.25, 0, null, null, null, 'book5.jpg');
INSERT INTO book (id, title, author, price, sales, publisher, author_description, book_description, cover) VALUES (6, '强风吹拂', '三浦紫苑', 38.5, 0, null, null, null, 'book6.jpg');
INSERT INTO book (id, title, author, price, sales, publisher, author_description, book_description, cover) VALUES (7, '福尔摩斯探案全集', '亚瑟·柯南·道尔', 164, 0, null, null, null, 'book7.jpg');
INSERT INTO book (id, title, author, price, sales, publisher, author_description, book_description, cover) VALUES (8, 'GO专家编程', '任红彩', 87.18, 0, null, null, null, 'book8.jpg');
INSERT INTO book (id, title, author, price, sales, publisher, author_description, book_description, cover) VALUES (9, '女神异闻录5设定集', 'Atlus', 208, 0, null, null, null, 'book9.jpg');
INSERT INTO book (id, title, author, price, sales, publisher, author_description, book_description, cover) VALUES (10, 'Chin up!', '陈奕迅', 184.8, 0, null, null, null, 'book10.jpg');
INSERT INTO book (id, title, author, price, sales, publisher, author_description, book_description, cover) VALUES (11, '沙丘', '弗兰克·赫伯特', 49.5, 0, null, null, null, 'book11.jpg');
INSERT INTO book (id, title, author, price, sales, publisher, author_description, book_description, cover) VALUES (12, '许三观卖血记', '余华', 20.5, 0, null, null, null, 'book12.jpg');
COMMIT;

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `address` TEXT NULL,
    `addressee` VARCHAR(255) NULL,
    `avatar` VARCHAR(255) NULL,
    `balance` DOUBLE NOT NULL,
    `birthday` VARCHAR(255) NULL,
    `nickname` VARCHAR(255) NULL,
    `phone` BIGINT NULL,
    `sex` VARCHAR(255) NULL,
    `signature` TEXT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

BEGIN;
INSERT INTO `user` (id, address, addressee, avatar, balance, birthday, nickname, phone, sex, signature) VALUES (1, null, null, null, 0, null, null, null, null, null);
INSERT INTO `user` (id, address, addressee, avatar, balance, birthday, nickname, phone, sex, signature) VALUES (2, '上海市闵行区 东川路800号 上海交通大学', '池昊', '143873758.jpg', 200, '2014-12-31T16:00:00.000Z', 'admin', '15517597867', 'male', '这人是个懒狗，什么都没有写');
INSERT INTO `user` (id, address, addressee, avatar, balance, birthday, nickname, phone, sex, signature) VALUES (3, null, null, null, 0, null, null, null, null, null);
INSERT INTO `user` (id, address, addressee, avatar, balance, birthday, nickname, phone, sex, signature) VALUES (4, null, null, null, 0, null, null, null, null, null);
COMMIT;

DROP TABLE IF EXISTS `user_auth`;
CREATE TABLE IF NOT EXISTS `user_auth` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `user_id` BIGINT NOT NULL,
    CONSTRAINT `user_auth_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

BEGIN;
INSERT INTO `user_auth` (id, username, password, user_id) VALUES (1, 'system', 'system', 1);
INSERT INTO `user_auth` (id, username, password, user_id) VALUES (2, 'ch', '123', 2);
INSERT INTO `user_auth` (id, username, password, user_id) VALUES (3, 'user1', '123', 3);
INSERT INTO `user_auth` (id, username, password, user_id) VALUES (4, 'user2', '123', 4);
COMMIT;

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL,
    `create_time` DATETIME NOT NULL,
    `address` TEXT NOT NULL,
    `addressee` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,
    CONSTRAINT `order_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

BEGIN;
INSERT INTO `orders` (id, user_id, create_time, address, addressee, phone) VALUES (1, 1, '2024-4-28 14:16:32', '系统订单', 'system', '0');
INSERT INTO `orders` (id, user_id, create_time, address, addressee, phone) VALUES (2, 2, '2024-4-28 14:15:32', 'test_address', '池昊', '15517597867');
INSERT INTO `orders` (id, user_id, create_time, address, addressee, phone) VALUES (3, 2, '2024-4-27 08:05:12', 'test_address', 'chihao', '15517597867');
INSERT INTO `orders` (id, user_id, create_time, address, addressee, phone) VALUES (4, 3, '2024-4-12 05:23:14', '东川路800号', 'test_addressee', '15517597867');
COMMIT;

DROP TABLE IF EXISTS `order_item`;
CREATE TABLE IF NOT EXISTS `order_item` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL,
    `book_id` BIGINT not null,
    `order_id` BIGINT not null,
    `number` INT not null,
    CONSTRAINT `order_item_fk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
    CONSTRAINT `order_item_fk_2` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`),
    CONSTRAINT `order_item_fk_3` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

BEGIN;
INSERT INTO `order_item` (id, user_id, book_id, order_id, number) VALUES (1, 2, 1, 1, 1);
INSERT INTO `order_item` (id, user_id, book_id, order_id, number) VALUES (2, 2, 4, 1, 1);
INSERT INTO `order_item` (id, user_id, book_id, order_id, number) VALUES (3, 2, 7, 2, 2);
INSERT INTO `order_item` (id, user_id, book_id, order_id, number) VALUES (4, 2, 1, 3, 1);
INSERT INTO `order_item` (id, user_id, book_id, order_id, number) VALUES (5, 1, 1, 1, 1);
COMMIT;

DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL,
    CONSTRAINT `cart_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);

BEGIN;
INSERT INTO `cart` (id, user_id) VALUES (1, 1);
INSERT INTO `cart` (id, user_id) VALUES (2, 2);
INSERT INTO `cart` (id, user_id) VALUES (3, 3);
INSERT INTO `cart` (id, user_id) VALUES (4, 4);
COMMIT;

DROP TABLE IF EXISTS `cart_item`;
CREATE TABLE IF NOT EXISTS `cart_item` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL,
    `book_id` BIGINT not null,
    `cart_id` BIGINT not null,
    `number` INT not null,
    CONSTRAINT `cart_item_fk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
    CONSTRAINT `cart_item_fk_2` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`),
    CONSTRAINT `cart_item_fk_3` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

BEGIN;
INSERT INTO `cart_item` (id, user_id, book_id, cart_id, number) VALUES (1, 2, 1, 1, 1);
INSERT INTO `cart_item` (id, user_id, book_id, cart_id, number) VALUES (2, 2, 4, 1, 1);
INSERT INTO `cart_item` (id, user_id, book_id, cart_id, number) VALUES (3, 2, 7, 2, 2);
INSERT INTO `cart_item` (id, user_id, book_id, cart_id, number) VALUES (4, 2, 1, 3, 1);
INSERT INTO `cart_item` (id, user_id, book_id, cart_id, number) VALUES (5, 1, 1, 1, 1);
COMMIT;
