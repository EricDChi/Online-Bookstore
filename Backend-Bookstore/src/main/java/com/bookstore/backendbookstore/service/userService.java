package com.bookstore.backendbookstore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.persistence.*;
import com.bookstore.backendbookstore.dao.userDAO;
import com.bookstore.backendbookstore.entity.user;

@Service
public class userService {

    public static class userRequest {
        private String username;
        private String password;

        public String getUsername() {
            return this.username;
        }
        public void setUsername(String username) {
            this.username = username;
        }
        public String getPassword() {
            return this.password;
        }
        public void setPassword(String password) {
            this.password = password;
        }
    }

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
