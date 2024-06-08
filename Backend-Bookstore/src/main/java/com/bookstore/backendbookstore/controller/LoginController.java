package com.bookstore.backendbookstore.controller;

import com.bookstore.backendbookstore.service.UserService;
import com.bookstore.backendbookstore.utils.Msg;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.*;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@EnableAutoConfiguration
public class LoginController {

    private final UserService userService;

    @Autowired
    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/api/login")
    public Msg login(@RequestBody Map<String, String> params, HttpSession session) {
        String username = params.get("username");
        String password = params.get("password");
        return userService.checkLogin(username, password, session);
    }

    @PutMapping("/api/logout")
    public Msg logout(HttpSession session) {
        if (session.getAttribute("user") == null) {
            return new Msg(false, "用户未登录", null);
        }
        session.invalidate();
        return new Msg(true, "注销成功", null);
    }
}