package com.bookstore.backendbookstore.dao;

import com.bookstore.backendbookstore.entity.User;

import java.util.List;

public interface UserDao {

    void updateBalanceById(Long id, Long price);

    User findById(Long id);

    List<User> findAll();

    void save(User user);
}