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
import org.mindrot.jbcrypt.BCrypt;

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
        UserAuth userAuth = userAuthDao.findByUsername(username);
        if (userAuth == null) {
            return new Msg(false, "用户名不存在", null);
        }
        if (password == null || !BCrypt.checkpw(password, userAuth.getPassword())) {
            return new Msg(false, "密码错误", null);
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
    public Msg checkSignup(String username, String password) {
        if (userAuthDao.existsByUsername(username)) {
            return new Msg(false, "用户名已存在", null);
        }
        User newUser = new User();
        userDao.save(newUser);
        Long userId = newUser.getId();
        String encodedPassword = BCrypt.hashpw(password, BCrypt.gensalt(12));  // 加密密码
        UserAuth newUserAuth = new UserAuth(username, encodedPassword, userId);
        userAuthDao.save(newUserAuth);
        return new Msg(true, "注册成功", null);
    }

    @Override
    public void updateBalance(Long id, Integer price) {
        userDao.updateBalanceById(id, price);
    }
}
