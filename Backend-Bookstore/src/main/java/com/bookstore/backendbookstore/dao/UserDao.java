package com.bookstore.backendbookstore.dao;

import com.bookstore.backendbookstore.entity.Book;
import com.bookstore.backendbookstore.entity.User;

import java.util.List;

public interface UserDao {

    void updateBalanceById(Long id, Integer price);

    User findById(Long id);

    List<User> findAll();

    List<User> getPagedUsers(Integer pageIndex, Integer pageSize);

    int count();

    void save(User user);

    boolean existsByEmail(String email);
}