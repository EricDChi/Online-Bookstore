package com.bookstore.backendbookstore.dao;

import com.bookstore.backendbookstore.entity.UserAuth;

public interface UserAuthDao {


    boolean existsByUsername(String username);

    void save(UserAuth userAuth);

    Long GetUserIdByUsernameAndPassword(String username, String password);
}