CREATE DATABASE IF NOT EXISTS book_store;
USE book_store;

CREATE TABLE IF NOT EXISTS books (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NULL,
    price DOUBLE NOT NULL,
    sales BIGINT NULL,
    publisher VARCHAR(255) NULL,
    author_description TEXT NULL,
    book_description TEXT NULL,
    cover VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    address TEXT NULL,
    addressee VARCHAR(255) NULL,
    avatar VARCHAR(255) NULL,
    balance DOUBLE NOT NULL,
    birthday VARCHAR(255) NULL,
    nickname VARCHAR(255) NULL,
    phone BIGINT NULL,
    sex VARCHAR(255) NULL,
    signature TEXT NULL
);

INSERT INTO books (id, title, author, price, sales, publisher, author_description, book_description, cover) VALUES (1, 'C++ Primer 中文版（第5版）', 'Stanley B.Lippman', 57.5, 8, '电子工业出版社', '       这本久负盛名的 C++ 经典教程，时隔八年之久，终迎来史无前例的重大升级。除令全球无数程序员从中受益，甚至为之迷醉的——C++ 大师 Stanley B. Lippman 的丰富实践经验，C++标准委员会原负责人 Josée Lajoie 对C++标准的深入理解，以及C+ + 先驱 Barbara E. Moo 在 C++教学方面的真知灼见外,更是基于全新的 C++11标准进行了全面而彻底的内容更新。非常难能可贵的是，本书所有示例均全部采用C++11 标准改写，这在经典升级版中极其罕见——充分体现了 C++ 语言的重大进展及其全面实践。书中丰富的教学辅助内容、醒目的知识点提示，以及精心组织的编程示范，让这本书在 C++ 领域的权威地位更加不可动摇。无论是初学者入门，或是中、高级程序员提升，本书均为不容置疑的首选。', '       Stanley B. Lippman目前是微软公司 Visual C++ 团队的架构师。他从1984年开始在贝尔实验室与C++的设计者Bjarne Stroustrup一起从事C++的设计与开发。他在迪士尼和梦工厂从事动画制作，还担任过JPL的高级顾问。他还著有Inside the C++ Object Model。\\n       Josée Lajoie曾经是IBM加拿大研究中心C/C++编译器开发团队的成员，在ISO C++标准委员会工作了7年，担任过ISO核心语言工作组的主席和C++ Report杂志的专栏作家。\\n       Barbara E. Moo是拥有25年软件经验的独立咨询顾问。在AT&T，她与Stroustrup、Lippman一起管理过复杂的C++开发项目。她和Andrew Koenig合著了Accelerated C++和Ruminations on C++。', 'book1.png');
INSERT INTO books (id, title, author, price, sales, publisher, author_description, book_description, cover) VALUES (2, '地 关于地球的运动', '鱼丰', 83.2, 2, '九州出版社', '       從小對繪畫有強大的興趣，中學時受到《爆漫王》影響，立志成為漫畫家，於2017年開始投稿。\\n       在週刊少年マガジン新人漫畫賞中入選佳作後，2018年開始了第一部連載作品《百米》(暫譯)。2020年開始連載《地。-關於地球的運動-》，以地動說為主軸，講述對知識渴望與傳承。       第26回手塚治蟲文化賞，史上最年輕得獎者。', '       「到底要付出什麼，才能瞭解這世上的一切——？」\\n       15世紀前期的Ｐ王國，拉斐爾是百年難的一見的神童，預計在大學主修神學。\\n       因緣際會下，遇見了因從事「禁止研究」而被折磨拷問的異教徒赫伯特。\\n       他的工作與宗教正式認可的「地心說」背道而馳，\\n       因此，赫伯特被認為是應該懺悔的異端者。\\n       拉斐爾起初否定了赫伯特的理論，\\n       但他理性的性格以及對天文學的好奇，\\n       逐漸被「日心說」的理性之美所吸引……', 'book2.jpg');
INSERT INTO books (id, title, author, price, sales, publisher, author_description, book_description, cover) VALUES (3, '艾欧泽亚百科全书', 'Square Enix', 255, 0, '出版社', null, null, 'book3.jpg');
INSERT INTO books (id, title, author, price, sales, publisher, author_description, book_description, cover) VALUES (4, '穆斯林的葬礼', '霍达', 49, 0, null, null, null, 'book4.jpg');
INSERT INTO books (id, title, author, price, sales, publisher, author_description, book_description, cover) VALUES (5, '射雕英雄传', '金庸', 94.25, 0, null, null, null, 'book5.jpg');
INSERT INTO books (id, title, author, price, sales, publisher, author_description, book_description, cover) VALUES (6, '强风吹拂', '三浦紫苑', 38.5, 0, null, null, null, 'book6.jpg');
INSERT INTO books (id, title, author, price, sales, publisher, author_description, book_description, cover) VALUES (7, '福尔摩斯探案全集', '亚瑟·柯南·道尔', 164, 0, null, null, null, 'book7.jpg');
INSERT INTO books (id, title, author, price, sales, publisher, author_description, book_description, cover) VALUES (8, 'GO专家编程', '任红彩', 87.18, 0, null, null, null, 'book8.jpg');
INSERT INTO books (id, title, author, price, sales, publisher, author_description, book_description, cover) VALUES (9, '女神异闻录5设定集', 'Atlus', 208, 0, null, null, null, 'book9.jpg');
INSERT INTO books (id, title, author, price, sales, publisher, author_description, book_description, cover) VALUES (10, 'Chin up！', '陈奕迅', 184.8, 0, null, null, null, 'book10.jpg');
INSERT INTO books (id, title, author, price, sales, publisher, author_description, book_description, cover) VALUES (11, '沙丘', '弗兰克·赫伯特', 49.5, 0, null, null, null, 'book11.jpg');
INSERT INTO books (id, title, author, price, sales, publisher, author_description, book_description, cover) VALUES (12, '许三观卖血记', '余华', 20.5, 0, null, null, null, 'book12.jpg');

INSERT INTO users (id, username, password, address, addressee, avatar, balance, birthday, nickname, phone, sex, signature) VALUES (1, 'ch', '123', '上海市闵行区 东川路800号 上海交通大学', '池昊', '143873758.jpg', 200, '2014-12-31T16:00:00.000Z', 'admin', 15517597867, 'male', '这人是个懒狗，什么都没有写');
INSERT INTO users (id, username, password, address, addressee, avatar, balance, birthday, nickname, phone, sex, signature) VALUES (2, 'user1', '123', null, null, null, 0, null, null, null, null, null);
INSERT INTO users (id, username, password, address, addressee, avatar, balance, birthday, nickname, phone, sex, signature) VALUES (3, 'user2', '123', null, null, null, 0, null, null, null, null, null);
