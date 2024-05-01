import { total_books } from "./books"
import { DUMMY_RESPONSE, PREFIX, del, getJson, put } from "./common";

export var cart_books = [
    {
        id: 1,
        number: 1,
        book: total_books.at(0)
    }
]

export async function getCartBooks() {
    return cart_books;
}

export async function addCartBooks(id) {
    for (const cart_book of cart_books) {
        if (cart_book.id === id) {
            return false;
        }
    }
    cart_books.push(
        {
            id: id,
            number: 1,
            book: total_books[id - 1]
        }
    );
    return true;
}

export async function deleteCartBooks(id) {
    for (var i = 0; i < cart_books.length; i++) {
        if (cart_books[i] === id) {
            cart_books.splice(i, 1);
        }
    }
}

export async function changeCartBookNumber(id, num) {
    for (const cart_book of cart_books) {
        if (cart_book.id === id) {
            cart_books.number = num;
        }
    }
}

export async function getCartItems() {
    const url = `${PREFIX}/cart`;
    let cartItems;
    try {
        cartItems = await getJson(url);
    } catch (e) {
        console.log(e);
        cartItems = []
    }
    return cartItems;
}

export async function deleteCartItem(id) {
    const url = `${PREFIX}/cart/${id}`;
    let res;
    try {
        res = await del(url);
    } catch (e) {
        console.log(e);
        res = DUMMY_RESPONSE;
    }
    return res;
}

export async function addCartItem(bookId) {
    const url = `${PREFIX}/cart?bookId=${bookId}`;
    let response;
    try {
        response = await put(url);
    } catch (e) {
        console.log(e);
        response = DUMMY_RESPONSE;
    }
    return response;
}

export async function changeCartItemNumber(id, number) {
    const url = `${PREFIX}/cart/${id}?number=${number}`;
    let response;
    try {
        response = await put(url);
    } catch (e) {
        console.log(e);
        response = DUMMY_RESPONSE;
    }
    return response;
}