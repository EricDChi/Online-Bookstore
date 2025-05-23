import { BASEURL, del, FUNC_PREFIX, get, getJson, MICROSERVICE_PREFIX, post, PREFIX, put } from "./common";

export async function searchBooks(keyword, pageIndex, pageSize) {
    let url;
    let books;
    if (keyword === '') {
        url = `${PREFIX}/books?pageIndex=${pageIndex}&pageSize=${pageSize}`;
    }
    else {
        url = `${PREFIX}/search?keyword=${keyword}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    }

    try {
        books = await getJson(url);
    } catch (e) {
        console.log(e);
        books = {
            total: 0,
            items: []
        };
    }
    return books;
}

export async function searchBookByTitle(title) {
    const url = `${BASEURL}/graphql`;
    console.log(title);
    let body = {
        query: `
            query ($bookTitle: String) {
                bookByTitle(title: $bookTitle) {
                    id
                    title
                    author
                }
            }
        `,
        variables: {
            bookTitle: title
        }
    };

    try {
        let res = await post(url, body);
        console.log(res.data);
        return res.data;
    } catch (e) {
        console.log(e);
        return
    }
}

export async function searchBookByLabel(label) {
    const url = `${PREFIX}/book/label/${label}`;
    let books;

    try {
        books = await getJson(url);
        console.log(books);
    } catch (e) {
        console.log(e);
        books = {
            total: 0,
            items: []
        };
    }
    return books;
}

export async function getBookById(id) {
    const url = `${PREFIX}/book/${id}`;
    let book;
    try {
        book = await getJson(url);
    } catch (e) {
        console.log(e);
        book = null;
    }
    return book;
}

export async function getAllBooks() {
    let books;
    try {
        books = await getJson(`${PREFIX}/book`);
    } catch (e) {
        console.log(e);
        books = {
            total: 0,
            items: []
        };
    }
    return books;
}

export async function deleteBook(id) {
    const url = `${PREFIX}/book/${id}`;
    let res;
    try {
        res = await del(url);
    } catch (e) {
        console.log(e);
        res = null;
    }
    return res;
}

export async function updateBook(book) {
    const url = `${PREFIX}/book/update`;
    let res;
    try {
        res = put(url, book);
    } catch (e) {
        console.log(e);
        res = null;
    }
    return res;
}

export async function addBook(book) {
    const url = `${PREFIX}/book/add`;
    let res;
    try {
        res = put(url, book);
    } catch (e) {
        console.log(e);
        res = null;
    }
    return res;
}

export async function analyzeBooks(pageIndex, pageSize, startDate, endDate) {
    const url = `${PREFIX}/book/analyze?pageIndex=${pageIndex}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}`;
    let books;

    try {
        books = await getJson(url);
    } catch (e) {
        console.log(e);
        books = {
            total: 0,
            items: []
        };
    }
    return books;
}

export async function rankBooks(startDate, endDate) {
    const url = `${PREFIX}/book/rank?startDate=${startDate}&endDate=${endDate}`;
    let books;

    try {
        books = await getJson(url);
    } catch (e) {
        console.log(e);
        books = {
            number: 0,
            items: []
        };
    }
    return books;
}

export async function getTotalPrice(num, price) {
    const url = `${FUNC_PREFIX}/totalPrice`;
    let res;

    try {
        res = await post(url, [[ num, price ]]);
    } catch (e) {
        console.log(e);
        res = null;
    }
    return res;
}

export async function getAuthorByTitle(title) {
    const url = `${MICROSERVICE_PREFIX}/bookAuthor/${title}`;
    let author;

    try {
        author = await get(url);
    } catch (e) {
        console.log(e);
        author = null;
    }
    return author;
}