package com.bookstore.backendbookstore.serviceimpl;

import com.bookstore.backendbookstore.service.UserService;
import com.bookstore.backendbookstore.utils.Msg;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bookstore.backendbookstore.dao.UserDao;
import com.bookstore.backendbookstore.dao.UserAuthDao;
import com.bookstore.backendbookstore.entity.User;
import com.bookstore.backendbookstore.entity.UserAuth;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserDao userDao;

    @Autowired
    UserAuthDao userAuthDao;

    public Msg checkLogin(String username, String password, HttpSession session) {
        UserAuth userAuth = userAuthDao.checkUser(username, password);
        if (userAuth == null) {
            return new Msg(false, "用户名或密码错误", null);
        }
        Long id = userAuth.getUser_id();
        User user = userDao.findById(id);
        if (user != null) {
            if (user.getStatus() == Boolean.TRUE) {
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
            User updatedUser = userDao.findById(user.getId());
            if (updatedUser != null) {
                session.setAttribute("user", updatedUser);
                return updatedUser;
            }
        }
        return new User();
    }

    public List<User> getAllUsers() {
        return userDao.findAll();
    }

    public Integer getUserRole(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return 0;
        }
        return user.getRole();
    }

    public Msg banUser(Long id) {
        User user = userDao.findById(id);
        if (user != null) {
            if (user.getRole().equals(1)) {
                return new Msg(false, "无法解禁管理员", null);
            }
            user.setStatus(Boolean.TRUE);
            userDao.save(user);
            return new Msg(true, "禁用成功", null);
        }
        return new Msg(false, "禁用失败", null);
    }

    public Msg unbanUser(Long id) {
        User user = userDao.findById(id);
        if (user != null) {
            if (user.getRole().equals(1)) {
                return new Msg(false, "无法解禁管理员", null);
            }
            user.setStatus(Boolean.FALSE);
            userDao.save(user);
            return new Msg(true, "解禁成功", null);
        }
        return new Msg(false, "解禁失败", null);
    }

    public Msg checkSignup(String username, String password) {
        if (userAuthDao.existsByUsername(username)) {
            return new Msg(false, "用户名已存在", null);
        }
        User newUser = new User();
        userDao.save(newUser);
        Long userId = newUser.getId();
        UserAuth newUserAuth = new UserAuth(username, password, userId);
        userAuthDao.save(newUserAuth);
        return new Msg(true, "注册成功", null);
    }

    public void updateBalance(Long id, Long price) {
        userDao.updateBalanceById(id, price);
    }
}
