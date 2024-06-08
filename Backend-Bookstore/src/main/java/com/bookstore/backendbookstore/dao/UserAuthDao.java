package com.bookstore.backendbookstore.dao;

import com.bookstore.backendbookstore.entity.UserAuth;

public interface UserAuthDao {

    UserAuth checkUser(String username, String password);

    UserAuth findByUsername(String username);

    boolean existsByUsername(String username);

    void save(UserAuth userAuth);
}