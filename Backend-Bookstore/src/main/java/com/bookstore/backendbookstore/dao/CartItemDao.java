package com.bookstore.backendbookstore.dao;

import com.bookstore.backendbookstore.entity.CartItem;
import org.springframework.data.repository.query.Param;


import java.util.List;

public interface CartItemDao {

    List<CartItem> findByUserId(Long userId);

    CartItem findByBookIdAndUserId(Long bookId, Long userId);

    void deleteByBookIdAndUserId(Long bookId, Long userId);

    void deleteByBookId(Long bookId);

    void updateNumberByBookIdAndUserId(@Param("bookId") Long bookId, @Param("userId") Long userId, @Param("number") Integer number);

    boolean existsByBookIdAndUserId(Long bookId, Long userId);

    void insertCartItem(CartItem cartItem);
}