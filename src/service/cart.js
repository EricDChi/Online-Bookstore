export async function getCartBooks() {
    const books = [
        {
            id: 1,
            number: 1,
            book: {
                id: '1',
                title: "C++ Primer 中文版（第5版)",
                price: 57.5,
                cover: "../book1.png"
            },
        },
        {
            id: 3,
            number: 1,
            book: {
                id: 2,
                title: "地 关于地球的运动",
                price: 83.2,
                cover: "../book2.jpg",
                book_description:"       「到底要付出什麼，才能瞭解這世上的一切——？」\n"
                + "       15世紀前期的Ｐ王國，拉斐爾是百年難的一見的神童，預計在大學主修神學。\n"
                + "       因緣際會下，遇見了因從事「禁止研究」而被折磨拷問的異教徒赫伯特。\n"
                + "       他的工作與宗教正式認可的「地心說」背道而馳，\n"
                + "       因此，赫伯特被認為是應該懺悔的異端者。\n"
                + "       拉斐爾起初否定了赫伯特的理論，\n"
                + "       但他理性的性格以及對天文學的好奇，\n"
                + "       逐漸被「日心說」的理性之美所吸引……"
            },
        },
    ]; 

    return books;
}