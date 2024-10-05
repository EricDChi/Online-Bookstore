package com.bookstore.backendbookstore.controller;

import com.alibaba.fastjson2.JSONObject;
import com.bookstore.backendbookstore.service.UserService;
import com.bookstore.backendbookstore.utils.Msg;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.*;
import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.*;
import com.bookstore.backendbookstore.entity.User;

import java.util.ArrayList;
import java.util.List;

@RestController
@EnableAutoConfiguration
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/api/me")
    public User getMe(HttpSession session) {
        return userService.getUser(session);
    }

    @GetMapping("/api/user")
    public List<User> getUsers(HttpSession session) {
        if (userService.getUserRole(session).equals(1)) {
            return userService.getAllUsers();
        }
        return new ArrayList<>();
    }

    @PostMapping("/api/user/ban/{id}")
    public Msg banUser(@PathVariable("id") Long id, HttpSession session) {
        if (userService.getUserRole(session).equals(1)) {
            return userService.banUser(id);
        }
        return new Msg(false, "权限不足", null);
    }

    @PostMapping("/api/user/unban/{id}")
    public Msg unbanUser(@PathVariable("id") Long id, HttpSession session) {
        if (userService.getUserRole(session).equals(1)) {
            return userService.unbanUser(id);
        }
        return new Msg(false, "权限不足", null);
    }

    @GetMapping("api/users")
    public JSONObject getUsers(@RequestParam("pageIndex") Integer pageIndex,
                               @RequestParam("pageSize") Integer pageSize) {
        return userService.getPagedUsers(pageIndex, pageSize);
    }
}
