package com.bookstore.backendbookstore.controller;

import com.bookstore.backendbookstore.utils.Msg;
import jakarta.servlet.http.HttpSession;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.*;
import org.springframework.web.bind.annotation.*;
import com.bookstore.backendbookstore.service.UserService;
import com.bookstore.backendbookstore.entity.User;

import java.util.Map;

@RestController
@EnableAutoConfiguration
public class LoginController {

    @Autowired
    UserService userService;

    @Getter
    @Setter
    public static class userRequest {
        private String username;
        private String password;
    }

    @PostMapping("/api/login")
    public Msg login(@RequestBody Map<String, String> params, HttpSession session) {
        String username = params.get("username");
        String password = params.get("password");
        User user = userService.checkLogin(username, password);
        if (user != null) {
            session.setAttribute("user", user);
            return new Msg(true, "登陆成功", null);
        }
        return new Msg(false, "登陆失败", null);
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
