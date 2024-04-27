package com.bookstore.backendbookstore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.*;
import org.springframework.web.bind.annotation.*;
import com.bookstore.backendbookstore.entity.user;
import com.bookstore.backendbookstore.service.userService;

@RestController
@EnableAutoConfiguration
public class userController {

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
    userService userService;
    String username;
    String password;

    @GetMapping("/api/me")
    public user getMe() {
        user user = userService.checkLogin(username, password);
        if (user != null) {
            return user;
        }
        return new user();
    }

    @PostMapping("/api/login")
    public String login(@RequestBody userRequest userRequest) {
        user user = userService.checkLogin(userRequest.getUsername(), userRequest.getPassword());
        if (user != null) {
            username = userRequest.getUsername();
            password = userRequest.getPassword();
            return "{\"ok\": true, \"message\": \"登陆成功\"}";
        }
        return "{\"ok\": false, \"message\": \"密码错误\"}";
    }

    @PutMapping("/api/logout")
    public String logout() {
        if (username == null || password == null) {
            return "{\"ok\": false, \"message\": \"退出失败\"}";
        }
        username = null;
        password = null;
        return "{\"ok\": true, \"message\": \"退出成功\"}";
    }
}
