package com.bookstore.backendbookstore.serviceimpl;

import com.alibaba.fastjson2.JSONObject;
import com.bookstore.backendbookstore.entity.Book;
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

    private final UserDao userDao;

    private final UserAuthDao userAuthDao;

    @Autowired
    public UserServiceImpl(UserDao userDao, UserAuthDao userAuthDao) {
        this.userDao = userDao;
        this.userAuthDao = userAuthDao;
    }

    @Override
    public Msg checkLogin(String username, String password, HttpSession session) {
        if (!userAuthDao.existsByUsername(username)) {
            return new Msg(false, "用户名不存在", null);
        }
        Long userId = userAuthDao.GetUserIdByUsernameAndPassword(username, password);
        if (password == null || userId == null) {
            return new Msg(false, "密码错误", null);
        }
        User user = userDao.findById(userId);
        if (user != null) {
            if (user.getStatus() == Boolean.TRUE) {
                return new Msg(false, "用户已被禁用", null);
            }
            session.setAttribute("user", user);
            return new Msg(true, "登陆成功", null);
        }
        return new Msg(false, "登陆失败", null);
    }


    @Override
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

    @Override
    public List<User> getAllUsers() {
        return userDao.findAll();
    }

    @Override
    public Integer getUserRole(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return 0;
        }
        return user.getRole();
    }

    @Override
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

    @Override
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

    @Override
    public Msg checkSignup(String username, String password, String email) {
        if (userAuthDao.existsByUsername(username)) {
            return new Msg(false, "用户名已存在", null);
        }
        if (userDao.existsByEmail(email)) {
            return new Msg(false, "邮箱已存在", null);
        }
        User newUser = new User(username);
        newUser.setEmail(email);
        userDao.save(newUser);
        Long userId = newUser.getId();
        UserAuth newUserAuth = new UserAuth(username, password, userId);
        userAuthDao.save(newUserAuth);
        return new Msg(true, "注册成功", null);
    }

    @Override
    public void updateBalance(Long id, Integer price) {
        userDao.updateBalanceById(id, price);
    }

    @Override
    public JSONObject getPagedUsers(Integer pageIndex, Integer pageSize) {
        List<User> items = userDao.getPagedUsers(pageIndex, pageSize);
        int total = (userDao.count() - 1) / pageSize + 1;
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("total", total);
        jsonObject.put("items", items);
        return jsonObject;
    }
}
