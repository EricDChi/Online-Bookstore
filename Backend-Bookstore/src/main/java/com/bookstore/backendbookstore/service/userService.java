package com.bookstore.backendbookstore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.persistence.*;
import com.bookstore.backendbookstore.dao.userDAO;
import com.bookstore.backendbookstore.dao.userAuthDAO;
import com.bookstore.backendbookstore.entity.user;
import com.bookstore.backendbookstore.entity.userAuth;

@Service
public class userService {

    @Autowired
    userDAO userDAO;

    @Autowired
    userAuthDAO userAuthDAO;

    public user checkLogin(String username, String password) {
        userAuth userAuth = userAuthDAO.checkUser(username, password);
        if (userAuth == null) {
            return null;
        }
        Long id = userAuth.getUser_id();
        user user = userDAO.findById(id).orElse(null);
        return user;
    }
}
