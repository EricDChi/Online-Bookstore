package com.bookstore.backendbookstore.controller;

import com.bookstore.backendbookstore.utils.Msg;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.*;
import org.springframework.web.bind.annotation.*;
import com.bookstore.backendbookstore.service.UserService;

import java.util.Map;

@RestController
@EnableAutoConfiguration
public class SignupController {

    @Autowired
    UserService userService;

    @PutMapping("/api/signup")
    public Msg signup(@RequestBody Map<String, String> params, HttpSession session) {
        String username = params.get("username");
        String password = params.get("password");
        return userService.checkSignup(username, password);
    }
}
