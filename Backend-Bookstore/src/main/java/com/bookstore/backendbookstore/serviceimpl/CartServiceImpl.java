package com.bookstore.backendbookstore.serviceimpl;

import com.bookstore.backendbookstore.dao.BookDao;
import com.bookstore.backendbookstore.dao.CartItemDao;
import com.bookstore.backendbookstore.service.CartService;
import com.bookstore.backendbookstore.utils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bookstore.backendbookstore.entity.CartItem;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    private final CartItemDao cartItemDao;
    private final BookDao bookDao;

    @Autowired
    public CartServiceImpl(CartItemDao cartItemDao, BookDao bookDao) {
        this.cartItemDao = cartItemDao;
        this.bookDao = bookDao;
    }

    @Override
    public List<CartItem> getCartItems(Long userId) {
        return cartItemDao.findByUserId(userId);
    }

    @Override
    public Msg deleteCartItem(Long bookId, Long userId) {
        if (cartItemDao.findByBookIdAndUserId(bookId, userId) == null) {
            return new Msg(false, "书籍不存在", null);
        }
        cartItemDao.deleteByBookIdAndUserId(bookId, userId);
        return new Msg(true, "删除成功", null);
    }

    @Override
    public Msg changeCartItemNumber(Long bookId, Long userId, Integer number) {
        if (cartItemDao.findByBookIdAndUserId(bookId, userId) == null) {
            return new Msg(false, "书籍不存在", null);
        }
        cartItemDao.updateNumberByBookIdAndUserId(bookId, userId, number);
        return new Msg(true, "更改成功", null);
    }

    @Override
    public Msg addCartItem(Long bookId, Long userId) {
        if (!bookDao.existsById(bookId)) {
            return new Msg(false, "书籍不存在", null);
        }
        if (cartItemDao.existsByBookIdAndUserId(bookId, userId)) {
            return new Msg(false, "已在购物车内，请勿重复添加", null);
        }
        CartItem cartItem = new CartItem(bookId, userId);
        cartItemDao.insertCartItem(cartItem);
        return new Msg(true, "添加成功", null);
    }
}
