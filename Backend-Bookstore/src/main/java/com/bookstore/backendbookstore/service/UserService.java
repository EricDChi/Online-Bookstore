package com.bookstore.backendbookstore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bookstore.backendbookstore.dao.UserDAO;
import com.bookstore.backendbookstore.dao.UserAuthDAO;
import com.bookstore.backendbookstore.entity.User;
import com.bookstore.backendbookstore.entity.UserAuth;

@Service
public class UserService {

    @Autowired
    UserDAO userDAO;

    @Autowired
    UserAuthDAO userAuthDAO;

    public User checkLogin(String username, String password) {
        UserAuth userAuth = userAuthDAO.checkUser(username, password);
        if (userAuth == null) {
            return null;
        }
        Long id = userAuth.getUser_id();
        User user = userDAO.findById(id).orElse(null);
        return user;
    }
}
