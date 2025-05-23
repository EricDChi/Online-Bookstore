DROP DATABASE IF EXISTS `book_store`;
CREATE DATABASE `book_store` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `book_store`;
SET NAMES utf8mb4;

DROP TABLE IF EXISTS `book`;
CREATE TABLE IF NOT EXISTS `book` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `author` VARCHAR(255) NULL,
    `price` INT NOT NULL,
    `sales` INT DEFAULT 0 NOT NULL,
    `publisher` VARCHAR(255) NULL,
    `author_description` TEXT NULL,
    `book_description` TEXT NULL,
    `ISBN` VARCHAR(20) NOT NULL unique,
    `stock` INT DEFAULT 0 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

BEGIN;
INSERT INTO book (id, title, author, price, sales, publisher, author_description, book_description, ISBN, stock) VALUES (1, 'C++ Primer 中文版(第5版)', 'Stanley B.Lippman', 5750, 8, '电子工业出版社', '       这本久负盛名的 C++ 经典教程，时隔八年之久，终迎来史无前例的重大升级。除令全球无数程序员从中受益，甚至为之迷醉的——C++ 大师 Stanley B. Lippman 的丰富实践经验，C++标准委员会原负责人 Josée Lajoie 对C++标准的深入理解，以及C+ + 先驱 Barbara E. Moo 在 C++教学方面的真知灼见外,更是基于全新的 C++11标准进行了全面而彻底的内容更新。非常难能可贵的是，本书所有示例均全部采用C++11 标准改写，这在经典升级版中极其罕见——充分体现了 C++ 语言的重大进展及其全面实践。书中丰富的教学辅助内容、醒目的知识点提示，以及精心组织的编程示范，让这本书在 C++ 领域的权威地位更加不可动摇。无论是初学者入门，或是中、高级程序员提升，本书均为不容置疑的首选。', '       Stanley B. Lippman目前是微软公司 Visual C++ 团队的架构师。他从1984年开始在贝尔实验室与C++的设计者Bjarne Stroustrup一起从事C++的设计与开发。他在迪士尼和梦工厂从事动画制作，还担任过JPL的高级顾问。他还著有Inside the C++ Object Model。\\n       Josée Lajoie曾经是IBM加拿大研究中心C/C++编译器开发团队的成员，在ISO C++标准委员会工作了7年，担任过ISO核心语言工作组的主席和C++ Report杂志的专栏作家。\\n       Barbara E. Moo是拥有25年软件经验的独立咨询顾问。在AT&T，她与Stroustrup、Lippman一起管理过复杂的C++开发项目。她和Andrew Koenig合著了Accelerated C++和Ruminations on C++。', '9787121267588', 1000);
INSERT INTO book (id, title, author, price, sales, publisher, author_description, book_description, ISBN, stock) VALUES (2, '地 关于地球的运动', '鱼丰', 8320, 2, '九州出版社', '       從小對繪畫有強大的興趣，中學時受到《爆漫王》影響，立志成為漫畫家，於2017年開始投稿。\\n       在週刊少年マガジン新人漫畫賞中入選佳作後，2018年開始了第一部連載作品《百米》(暫譯)。2020年開始連載《地。-關於地球的運動-》，以地動說為主軸，講述對知識渴望與傳承。       第26回手塚治蟲文化賞，史上最年輕得獎者。', '       「到底要付出什麼，才能瞭解這世上的一切——？」\\n       15世紀前期的Ｐ王國，拉斐爾是百年難的一見的神童，預計在大學主修神學。\\n       因緣際會下，遇見了因從事「禁止研究」而被折磨拷問的異教徒赫伯特。\\n       他的工作與宗教正式認可的「地心說」背道而馳，\\n       因此，赫伯特被認為是應該懺悔的異端者。\\n       拉斐爾起初否定了赫伯特的理論，\\n       但他理性的性格以及對天文學的好奇，\\n       逐漸被「日心說」的理性之美所吸引……', '9787544260000', 1000);
INSERT INTO book (id, title, author, price, sales, publisher, author_description, book_description, ISBN, stock) VALUES (3, '艾欧泽亚百科全书', 'Square Enix', 25500, 0, '出版社', null, null, '9784757545373', 1000);
INSERT INTO book (id, title, author, price, sales, publisher, author_description, book_description, ISBN, stock) VALUES (4, '穆斯林的葬礼', '霍达', 4900, 0, null, null, null, '9787530216093', 1000);
INSERT INTO book (id, title, author, price, sales, publisher, author_description, book_description, ISBN, stock) VALUES (5, '射雕英雄传', '金庸', 9425, 0, null, null, null, '9787530216094', 1000);
INSERT INTO book (id, title, author, price, sales, publisher, author_description, book_description, ISBN, stock) VALUES (6, '强风吹拂', '三浦紫苑', 3850, 0, null, null, null, '9787530216095', 1000);
INSERT INTO book (id, title, author, price, sales, publisher, author_description, book_description, ISBN, stock) VALUES (7, '福尔摩斯探案全集', '亚瑟·柯南·道尔', 16400, 0, null, null, null, '9787530216096', 1000);
INSERT INTO book (id, title, author, price, sales, publisher, author_description, book_description, ISBN, stock) VALUES (8, 'GO专家编程', '任红彩', 8718, 0, null, null, null, '9787530216097', 1000);
INSERT INTO book (id, title, author, price, sales, publisher, author_description, book_description, ISBN, stock) VALUES (9, '女神异闻录5设定集', 'Atlus', 20800, 0, null, null, null, '9787530216098', 1000);
INSERT INTO book (id, title, author, price, sales, publisher, author_description, book_description, ISBN, stock) VALUES (10, 'Chin up!', '陈奕迅', 18480, 0, null, null, null, '9787530216088', 1000);
INSERT INTO book (id, title, author, price, sales, publisher, author_description, book_description, ISBN, stock) VALUES (11, '沙丘', '弗兰克·赫伯特', 4950, 0, null, null, null, '9787530216087', 1000);
INSERT INTO book (id, title, author, price, sales, publisher, author_description, book_description, ISBN, stock) VALUES (12, '许三观卖血记', '余华', 2050, 0, null, null, null, '9787530216086', 1000);
COMMIT;

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(255) NULL,
    `address` TEXT NULL,
    `addressee` VARCHAR(255) NULL,
    `avatar` VARCHAR(255) NULL,
    `balance` INT DEFAULT 0 NOT NULL,
    `birthday` VARCHAR(255) NULL,
    `nickname` VARCHAR(40) NULL,
    `phone` VARCHAR(20) NULL,
    `sex` VARCHAR(20) NULL,
    `signature` TEXT NULL,
    `status` BOOLEAN DEFAULT FALSE NOT NULL,
    `role` INT DEFAULT 0 NOT NULL,
    CONSTRAINT `user_role_check` CHECK (`role` IN (0, 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

BEGIN;
INSERT INTO `user` (id, email, address, addressee, avatar, balance, birthday, nickname, phone, sex, signature, status, role) VALUES (1, '191451774@qq.com', null, null, null, 0, null, 'admin', null, null, null, FALSE, 1);
INSERT INTO `user` (id, email, address, addressee, avatar, balance, birthday, nickname, phone, sex, signature, status, role) VALUES (2, '137012867@qq.com', '上海市闵行区 东川路800号 上海交通大学', '池昊', '143873758.jpg', 200000000, '2014-12-31T16:00:00.000Z', 'Yoshi', '15517597867', 'male', '这人是个懒狗，什么都没有写', FALSE, 0);
INSERT INTO `user` (id, email, address, addressee, avatar, balance, birthday, nickname, phone, sex, signature, status, role) VALUES (3, '137012866@qq.com', null, null, null, 0, null, 'user1', null, null, null, TRUE, 0);
INSERT INTO `user` (id, email, address, addressee, avatar, balance, birthday, nickname, phone, sex, signature, status, role) VALUES (4, '137012865@qq.com', null, null, null, 0, null, 'user2', null, null, null, TRUE, 0);
COMMIT;

DROP TABLE IF EXISTS `user_auth`;
CREATE TABLE IF NOT EXISTS `user_auth` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(50) NOT NULL ,
    `password` VARCHAR(100) NOT NULL,
    `user_id` BIGINT NOT NULL,
    UNIQUE INDEX `idx_username` (`username`),
    CONSTRAINT `fk_user_auth_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

BEGIN;
INSERT INTO `user_auth` (id, username, password, user_id) VALUES (1, 'system', '123', 1);
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
    `phone` VARCHAR(20) NOT NULL,
    CONSTRAINT `fk_order_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
    INDEX `idx_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

BEGIN;
INSERT INTO `orders` (id, user_id, create_time, address, addressee, phone) VALUES (1, 4, '2024-6-27 14:11:32', '系统订单', 'system', '0');
INSERT INTO `orders` (id, user_id, create_time, address, addressee, phone) VALUES (2, 2, '2024-6-27 14:15:32', 'test_address', '池昊', '15517597867');
INSERT INTO `orders` (id, user_id, create_time, address, addressee, phone) VALUES (3, 2, '2024-6-27 08:05:12', 'test_address', 'chihao', '15517597867');
INSERT INTO `orders` (id, user_id, create_time, address, addressee, phone) VALUES (4, 3, '2024-6-28 05:23:14', '东川路800号', 'test_addressee', '15517597867');
COMMIT;

DROP TABLE IF EXISTS `order_item`;
CREATE TABLE IF NOT EXISTS `order_item` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `order_id` BIGINT NOT NULL,
    `number` INT DEFAULT 0 NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `cover` VARCHAR(255) NOT NULL,
    `price` BIGINT NOT NULL,
    CONSTRAINT `fk_order_item_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
    INDEX `idx_order_id` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

BEGIN;
INSERT INTO `order_item` (id, order_id, number, title, cover, price) VALUES (1, 1, 1, 'C++ Primer 中文版(第5版)', 'book1.png', 5750);
INSERT INTO `order_item` (id, order_id, number, title, cover, price) VALUES (2, 1, 1, '穆斯林的葬礼', 'book4.jpg', 4900);
INSERT INTO `order_item` (id, order_id, number, title, cover, price) VALUES (3, 2, 2, '福尔摩斯探案全集', 'book7.jpg', 32800);
INSERT INTO `order_item` (id, order_id, number, title, cover, price) VALUES (4, 3, 1, 'C++ Primer 中文版(第5版)', 'book1.png', 5750);
INSERT INTO `order_item` (id, order_id, number, title, cover, price) VALUES (5, 4, 1, 'C++ Primer 中文版(第5版)', 'book1.png', 5750);
COMMIT;

DROP TABLE IF EXISTS `cart_item`;
CREATE TABLE IF NOT EXISTS `cart_item` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL,
    `book_id` BIGINT NOT NULL,
    `number` INT DEFAULT 0 NOT NULL,
    CONSTRAINT `fk_cart_item_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
    CONSTRAINT `fk_cart_item_book` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`),
    INDEX `idx_user_id` (`user_id`),
    INDEX `idx_book_id` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

BEGIN;
INSERT INTO `cart_item` (id, user_id, book_id, number) VALUES (1, 2, 1, 1);
INSERT INTO `cart_item` (id, user_id, book_id, number) VALUES (2, 2, 4, 1);
INSERT INTO `cart_item` (id, user_id, book_id, number) VALUES (3, 2, 7, 2);
INSERT INTO `cart_item` (id, user_id, book_id, number) VALUES (4, 2, 2, 1);
INSERT INTO `cart_item` (id, user_id, book_id, number) VALUES (5, 1, 1, 1);
COMMIT;

DROP TABLE IF EXISTS `book_label`;
CREATE TABLE IF NOT EXISTS `book_label` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `book_id` BIGINT NOT NULL,
    `label` VARCHAR(255) NOT NULL,
    CONSTRAINT `fk_book_label_book` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`),
    INDEX `idx_label` (`label`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

BEGIN;
-- C++ Primer 中文版(第5版) 的标签
INSERT INTO `book_label` (id, book_id, label) VALUES (1, 1, '计算机科学');
INSERT INTO `book_label` (id, book_id, label) VALUES (2, 1, 'C++');
-- 地 关于地球的运动 的标签
INSERT INTO `book_label` (id, book_id, label) VALUES (3, 2, '漫画');
-- 艾欧泽亚百科全书 的标签
INSERT INTO `book_label` (id, book_id, label) VALUES (4, 3, '游戏');
-- 穆斯林的葬礼 的标签
INSERT INTO `book_label` (id, book_id, label) VALUES (5, 4, '现代文学');
-- 射雕英雄传 的标签
INSERT INTO `book_label` (id, book_id, label) VALUES (6, 5, '武侠');
-- 强风吹拂 的标签
INSERT INTO `book_label` (id, book_id, label) VALUES (7, 6, '体育');
INSERT INTO `book_label` (id, book_id, label) VALUES (8, 6, '田径');
-- 福尔摩斯探案全集 的标签
INSERT INTO `book_label` (id, book_id, label) VALUES (9, 7, '推理');
-- GO专家编程 的标签
INSERT INTO `book_label` (id, book_id, label) VALUES (10, 8, '计算机科学');
INSERT INTO `book_label` (id, book_id, label) VALUES (11, 8, '科学');
-- 女神异闻录5设定集 的标签
INSERT INTO `book_label` (id, book_id, label) VALUES (12, 9, '游戏');
-- Chin up! 的标签
INSERT INTO `book_label` (id, book_id, label) VALUES (13, 10, '音乐');
-- 沙丘 的标签
INSERT INTO `book_label` (id, book_id, label) VALUES (14, 11, '科幻');
-- 许三观卖血记 的标签
INSERT INTO `book_label` (id, book_id, label) VALUES (15, 12, '现代文学');
COMMIT;
