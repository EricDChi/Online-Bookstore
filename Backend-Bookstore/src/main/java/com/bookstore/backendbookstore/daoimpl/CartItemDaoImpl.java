package com.bookstore.backendbookstore.daoimpl;

import com.bookstore.backendbookstore.dao.CartItemDao;
import com.bookstore.backendbookstore.entity.CartItem;
import com.bookstore.backendbookstore.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class CartItemDaoImpl implements CartItemDao {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Override
    public List<CartItem> findByUserId(Long userId) {
        return cartItemRepository.findByUserId(userId);
    }

    public CartItem findByBookIdAndUserId(Long bookId, Long userId) {
        return cartItemRepository.findByBookIdAndUserId(bookId, userId);
    }

    public void deleteByBookIdAndUserId(Long bookId, Long userId) {
        cartItemRepository.deleteByBookIdAndUserId(bookId, userId);
    }

    public void updateNumberByBookIdAndUserId(@Param("bookId") Long bookId, @Param("userId") Long userId, @Param("number") Integer number) {
        cartItemRepository.updateNumberByBookIdAndUserId(bookId, userId, number);
    }

    public boolean existsByBookIdAndUserId(Long bookId, Long userId) {
        return cartItemRepository.existsByBookIdAndUserId(bookId, userId);
    }

    public void insertCartItem(CartItem cartItem) {
        cartItemRepository.save(cartItem);
    }
}
