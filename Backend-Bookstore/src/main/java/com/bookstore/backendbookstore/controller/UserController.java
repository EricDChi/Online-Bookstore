package com.bookstore.backendbookstore.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.*;
import org.springframework.web.bind.annotation.*;
import com.bookstore.backendbookstore.entity.User;
import com.bookstore.backendbookstore.service.UserService;

@RestController
@EnableAutoConfiguration
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/api/me")
    public User getMe(HttpSession session) {
        return userService.getUser(session);
    }

}
