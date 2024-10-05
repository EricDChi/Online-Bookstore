package com.bookstore.backendbookstore.controller;

import com.alibaba.fastjson2.JSONObject;
import com.bookstore.backendbookstore.service.TimerService;
import com.bookstore.backendbookstore.service.UserService;
import com.bookstore.backendbookstore.utils.Msg;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.*;
import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@EnableAutoConfiguration
@Scope("request")
public class LoginController {

    private final UserService userService;

    private final TimerService timerService;


    @Autowired
    public LoginController(UserService userService, TimerService timerService) {
        this.userService = userService;
        this.timerService = timerService;
    }

    @PostMapping("/api/login")
    public Msg login(@RequestBody Map<String, String> params, HttpSession session) {
        String username = params.get("username");
        String password = params.get("password");
        Msg msg = userService.checkLogin(username, password, session);
        if (msg.isOk()) {
            timerService.startTimer();
        }
        return msg;
    }

    @PutMapping("/api/logout")
    public Msg logout(HttpSession session) {
        if (session.getAttribute("user") == null) {
            return new Msg(false, "用户未登录", null);
        }
        session.invalidate();
        // 输出controller的id
        System.out.println(this);
        Long time = timerService.stopTimer();
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("time", time);
        System.out.println("User logged out after " + time + " milliseconds");
        return new Msg(true, "注销成功", jsonObject);
    }
}