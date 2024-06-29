package com.bookstore.backendbookstore.service;

import com.alibaba.fastjson2.JSONObject;
import com.bookstore.backendbookstore.entity.User;
import com.bookstore.backendbookstore.utils.Msg;
import jakarta.servlet.http.HttpSession;

import java.util.List;

public interface UserService {
    Msg checkLogin(String username, String password, HttpSession session);

    User getUser(HttpSession session);

    List<User> getAllUsers();

    Integer getUserRole(HttpSession session);

    Msg banUser(Long id);

    Msg unbanUser(Long id);

    Msg checkSignup(String username, String password, String email);

    void updateBalance(Long id, Integer price);

    JSONObject getPagedUsers(Integer pageIndex, Integer pageSize);
}
