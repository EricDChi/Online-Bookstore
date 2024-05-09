package com.bookstore.backendbookstore.service;

import com.bookstore.backendbookstore.dao.BookDAO;
import com.bookstore.backendbookstore.dao.CartItemDAO;
import com.bookstore.backendbookstore.entity.Book;
import com.bookstore.backendbookstore.utils.BookItem;
import com.bookstore.backendbookstore.utils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bookstore.backendbookstore.entity.CartItem;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartService {

    @Autowired
    CartItemDAO cartItemDAO;

    @Autowired
    BookDAO bookDAO;

    public List<BookItem> getCartItems(Long id) {
        List<CartItem> cartItems;
        List<BookItem> bookItems = new ArrayList<>();
        cartItems = cartItemDAO.findByUserId(id);
        for (CartItem cartItem : cartItems) {
            Book book = bookDAO.findById(cartItem.getBookId()).orElse(null);
            BookItem bookItem = new BookItem(cartItem.getBookId(), cartItem.getNumber(), book);
            bookItems.add(bookItem);
        }
        return bookItems;
    }

    public Msg deleteCartItem(Long bookId, Long userId) {
        if (cartItemDAO.findByBookIdAndUserId(bookId, userId) == null) {
            return new Msg(false, "书籍不存在", null);
        }
        cartItemDAO.deleteByBookIdAndUserId(bookId, userId);
        return new Msg(true, "删除成功", null);
    }

    public Msg changeCartItemNumber(Long bookId, Long userId, Integer number) {
        if (cartItemDAO.findByBookIdAndUserId(bookId, userId) == null) {
            return new Msg(false, "书籍不存在", null);
        }
        cartItemDAO.updateNumberByBookIdAndUserId(bookId, userId, number);
        return new Msg(true, "更改成功", null);
    }

    public Msg addCartItem(Long bookId, Long userId) {
        if (!bookDAO.existsById(bookId)) {
            return new Msg(false, "书籍不存在", null);
        }
        if (cartItemDAO.existsByBookIdAndUserId(bookId, userId)) {
            return new Msg(false, "已在购物车内，请勿重复添加", null);
        }
        CartItem cartItem = new CartItem(bookId, userId);
        cartItemDAO.insertCartItem(cartItem);
        return new Msg(true, "添加成功", null);
    }
}
