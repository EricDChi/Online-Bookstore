package com.bookstore.backendbookstore.service;

import com.bookstore.backendbookstore.dao.BookDAO;
import com.bookstore.backendbookstore.dao.CartItemDAO;
import com.bookstore.backendbookstore.entity.Book;
import com.bookstore.backendbookstore.utils.Msg;
import lombok.Getter;
import lombok.Setter;
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

    @Getter
    @Setter
    public static class CartResponse {
        private Long id;
        private Integer number;
        private Book book;

        public CartResponse(Long id, Integer number, Book book) {
            this.id = id;
            this.number = number;
            this.book = book;
        }
    }

    public List<CartResponse> getCartItems(Long id) {
        List<CartItem> cartItems = new ArrayList<>();
        List<CartResponse> cartResponse = new ArrayList<>();
        cartItems = cartItemDAO.findByUserId(id);
        for (int i = 0, cartItemsSize = cartItems.size(); i < cartItemsSize; i++) {
            CartItem cartItem = cartItems.get(i);
            Book book = bookDAO.findById(cartItem.getBookId()).orElse(null);
            CartResponse cartItemResponse = new CartResponse(cartItem.getBookId(), cartItem.getNumber(), book);
            cartResponse.add(cartItemResponse);
        }
        return cartResponse;
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
            return new Msg(false, "书籍已存在", null);
        }
        CartItem cartItem = new CartItem(bookId, userId);
        cartItemDAO.save(cartItem);
        return new Msg(true, "添加成功", null);
    }
}
