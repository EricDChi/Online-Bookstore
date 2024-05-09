package com.bookstore.backendbookstore.service;

import com.bookstore.backendbookstore.utils.Msg;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bookstore.backendbookstore.dao.UserDAO;
import com.bookstore.backendbookstore.dao.UserAuthDAO;
import com.bookstore.backendbookstore.entity.User;
import com.bookstore.backendbookstore.entity.UserAuth;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UserDAO userDAO;

    @Autowired
    UserAuthDAO userAuthDAO;

    public Msg checkLogin(String username, String password, HttpSession session) {
        UserAuth userAuth = userAuthDAO.checkUser(username, password);
        if (userAuth == null) {
            return new Msg(false, "用户名或密码错误", null);
        }
        Long id = userAuth.getUser_id();
        User user = userDAO.findById(id).orElse(null);
        if (user != null) {
            if (user.getForbidden() == Boolean.TRUE) {
                return new Msg(false, "用户已被禁用", null);
            }
            session.setAttribute("user", user);
            return new Msg(true, "登陆成功", null);
        }
        return new Msg(false, "登陆失败", null);
    }

    public User getUser(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            User updatedUser = userDAO.findById(user.getId()).orElse(null);
            if (updatedUser != null) {
                session.setAttribute("user", updatedUser);
                return updatedUser;
            }
        }
        return new User();
    }

    public List<User> getAllUsers() {
        return userDAO.findAll();
    }

    public Integer getUserRole(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return 0;
        }
        return user.getRole();
    }

    public Msg banUser(Long id) {
        User user = userDAO.findById(id).orElse(null);
        if (user != null) {
            if (user.getRole().equals(1)) {
                return new Msg(false, "无法解禁管理员", null);
            }
            user.setForbidden(Boolean.TRUE);
            userDAO.save(user);
            return new Msg(true, "禁用成功", null);
        }
        return new Msg(false, "禁用失败", null);
    }

    public Msg unbanUser(Long id) {
        User user = userDAO.findById(id).orElse(null);
        if (user != null) {
            if (user.getRole().equals(1)) {
                return new Msg(false, "无法解禁管理员", null);
            }
            user.setForbidden(Boolean.FALSE);
            userDAO.save(user);
            return new Msg(true, "解禁成功", null);
        }
        return new Msg(false, "解禁失败", null);
    }

    public Msg checkSignup(String username, String password) {
        if (userAuthDAO.existsByUsername(username)) {
            return new Msg(false, "用户名已存在", null);
        }
        User newUser = new User();
        userDAO.save(newUser);
        Long userId = newUser.getId();
        UserAuth newUserAuth = new UserAuth(username, password, userId);
        userAuthDAO.save(newUserAuth);
        return new Msg(true, "注册成功", null);
    }
}
