export const total_books = [
    {
        id: 1,
        title: "C++ Primer 中文版（第5版)",
        author: "Stanley B.Lippman",
        price: 57.5,
        cover: "../book1.png",
        sales: 8,
        publisher:"电子工业出版社",
        author_description: "       这本久负盛名的 C++ 经典教程，时隔八年之久，终迎来史无前例的重大升级。除令全球无数程序员从中受益，甚至为之迷醉的——C++ 大师 Stanley B. Lippman 的丰富实践经验，C++标准委员会原负责人 Josée Lajoie 对C++标准的深入理解，以及C+ + 先驱 Barbara E. Moo 在 C++教学方面的真知灼见外,更是基于全新的 C++11标准进行了全面而彻底的内容更新。非常难能可贵的是，本书所有示例均全部采用C++11 标准改写，这在经典升级版中极其罕见——充分体现了 C++ 语言的重大进展及其全面实践。书中丰富的教学辅助内容、醒目的知识点提示，以及精心组织的编程示范，让这本书在 C++ 领域的权威地位更加不可动摇。无论是初学者入门，或是中、高级程序员提升，本书均为不容置疑的首选。",
        book_description: "       Stanley B. Lippman目前是微软公司 Visual C++ 团队的架构师。他从1984年开始在贝尔实验室与C++的设计者Bjarne Stroustrup一起从事C++的设计与开发。他在迪士尼和梦工厂从事动画制作，还担任过JPL的高级顾问。他还著有Inside the C++ Object Model。\n"
            + "       Josée Lajoie曾经是IBM加拿大研究中心C/C++编译器开发团队的成员，在ISO C++标准委员会工作了7年，担任过ISO核心语言工作组的主席和C++ Report杂志的专栏作家。\n"
            + "       Barbara E. Moo是拥有25年软件经验的独立咨询顾问。在AT&T，她与Stroustrup、Lippman一起管理过复杂的C++开发项目。她和Andrew Koenig合著了Accelerated C++和Ruminations on C++。"
    },
    {
        id: 2,
        title: "地 关于地球的运动",
        author: "鱼丰|漫画",
        price: 83.2,
        cover: "../book2.jpg",
        publisher:"九州出版社",
        sales: 2,
        author_description:"       從小對繪畫有強大的興趣，中學時受到《爆漫王》影響，立志成為漫畫家，於2017年開始投稿。\n"
            + "       在週刊少年マガジン新人漫畫賞中入選佳作後，2018年開始了第一部連載作品《百米》(暫譯)。2020年開始連載《地。-關於地球的運動-》，以地動說為主軸，講述對知識渴望與傳承。"
            + "       第26回手塚治蟲文化賞，史上最年輕得獎者。",
        book_description:"       「到底要付出什麼，才能瞭解這世上的一切——？」\n"
            + "       15世紀前期的Ｐ王國，拉斐爾是百年難的一見的神童，預計在大學主修神學。\n"
            + "       因緣際會下，遇見了因從事「禁止研究」而被折磨拷問的異教徒赫伯特。\n"
            + "       他的工作與宗教正式認可的「地心說」背道而馳，\n"
            + "       因此，赫伯特被認為是應該懺悔的異端者。\n"
            + "       拉斐爾起初否定了赫伯特的理論，\n"
            + "       但他理性的性格以及對天文學的好奇，\n"
            + "       逐漸被「日心說」的理性之美所吸引……"
    },
    {
        id: 3,
        title: "艾欧泽亚百科全书",
        author: "Square Enix|Final Fantasy XIV|游戏设定集",
        price: 255,
        cover: "../book3.jpg"
    },
    {
        id: 4,
        title: "穆斯林的葬礼",
        author: "霍达",
        price: 49,
        cover: "../book4.jpg"
    },
    {
        id: 5,
        title: "射雕英雄传",
        author: "金庸",
        price: 94.25,
        cover: "../book5.jpg"
    },
    {
        id: 6,
        title: "强风吹拂",
        author: "三浦紫苑|日本|小说",
        price: 38.5,
        cover: "../book6.jpg"
    },
    {
        id: 7,
        title: "福尔摩斯探案全集",
        author: "亚瑟·柯南·道尔",
        price: 164,
        cover: "../book7.jpg"
    },
    {
        id: 8,
        title: "GO专家编程",
        author: "任红彩",
        price: 87.18,
        cover: "../book8.jpg"
    },
    {
        id: 9,
        title: "女神异闻录5设定集",
        author: "Atlus|Sega|游戏设定集",
        price: 208,
        cover: "../book9.jpg"
    },
    {
        id: 10,
        title: "Chin up！",
        author: "陈奕迅|流行|专辑",
        price: 184.8,
        cover: "../book10.jpg"
    },
    {
        id: 11,
        title: "沙丘",
        author: "弗兰克·赫伯特",
        price: 49.5,
        cover: "../book11.jpg"
    },
    {
        id: 12,
        title: "许三观卖血记",
        author: "余华",
        price: 20.5,
        cover: "../book12.jpg"
    }
]

export async function searchBooks(keyword, pageIndex, pageSize) {
    var books = [];
    var search_books = [];
    if (keyword !== "") {
        for (const book of total_books) {
            if (book.title.includes(keyword)) {
                search_books.push(book);
            }
        }
        books = search_books.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
        return {
            total: search_books.length / pageSize,
            items: books
        };
    }

    books = total_books.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
    return {
        total: total_books.length / pageSize,
        items: books
    };
}

export async function getBookById(id) {
    var book;
    book = total_books.at(id - 1);
    return book;
}