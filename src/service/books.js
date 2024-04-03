export function getBooks() {
    return [
        {
            id: 1,
            title: "C++ Primer 中文版（第5版)",
            author: "Stanley B.Lippman",
            price: 57.5,
            cover: "../book1.png"
        },
        {
            id: 2,
            title: "地 关于地球的运动",
            author: "鱼丰|漫画",
            price: 83.2,
            cover: "../book2.jpg"
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
    ]
}

export function searchBooks(keyword, pageIndex, pageSize) {
    var books = [];
    if (pageIndex == 0) {
        books = [
            {
                id: 1,
                title: "C++ Primer 中文版（第5版)",
                author: "Stanley B.Lippman",
                price: 57.5,
                cover: "../book1.png"
            },
            {
                id: 2,
                title: "地 关于地球的运动",
                author: "鱼丰|漫画",
                price: 83.2,
                cover: "../book2.jpg"
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
        ]
    }
    else if (pageIndex == 1) {
        books = [
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
    }
    return {
        total: 2,
        items: books
    };
}