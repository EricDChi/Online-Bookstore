package com.bookstore.backendbookstore.service;

import com.bookstore.backendbookstore.entity.CartItem;
import com.bookstore.backendbookstore.utils.Msg;

import java.util.List;

public interface CartService {
    List<CartItem> getCartItems(Long userId);

    Msg deleteCartItem(Long bookId, Long userId);

    Msg changeCartItemNumber(Long bookId, Long userId, Integer number);

    Msg addCartItem(Long bookId, Long userId);
}
