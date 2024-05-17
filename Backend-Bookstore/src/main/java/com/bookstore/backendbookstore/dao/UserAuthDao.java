package com.bookstore.backendbookstore.dao;

import com.bookstore.backendbookstore.entity.UserAuth;

public interface UserAuthDao {

    UserAuth checkUser(String username, String password);

    boolean existsByUsername(String username);

    void save(UserAuth userAuth);
}