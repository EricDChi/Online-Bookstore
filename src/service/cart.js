import { total_books } from "./books"

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