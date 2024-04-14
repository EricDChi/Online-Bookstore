import { total_books } from "./books"

export var cart_books = [
    {
        id: 1,
        number: 1,
        book: total_books.at(0)
    }
]

export async function getCartBooks() {
    var books = [];
    for (const cart_book of cart_books) {
        if (cart_book.number != 0) {
            books.push(cart_book);
        }
    }

    return books;
}

export async function addCartBooks(id) {
    for (const cart_book of cart_books) {
        if (cart_book.id === id) {
            return;
        }
    }
    cart_books.push(
        {
            id: id,
            number: 1,
            book: total_books[id - 1]
        }
    );
}

export async function deleteCartBooks(id) {
    for (const cart_book of cart_books) {
        if (cart_book.id == id) {
            cart_books.number = 0;
        }
    }
}

export async function changeCartBookNumber(id, num) {
    for (const cart_book of cart_books) {
        if (cart_book.id == id) {
            cart_books.number = num;
        }
    }
}