package com.bookstore.backendbookstore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.persistence.*;
import com.bookstore.backendbookstore.dao.userDAO;
import com.bookstore.backendbookstore.entity.user;

@Service
public class userService {

    @Autowired
    userDAO userDAO;

    public user checkLogin(String username, String password) {
        user user = userDAO.findByUsername(username);
        if (user == null) {
            return null;
        }
        if (password.equals(user.getPassword())) {
            return user;
        }
        return null;
    }
}
