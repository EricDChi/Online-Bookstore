package com.bookstore.backendbookstore.controller;

import com.alibaba.fastjson2.JSONObject;
import com.bookstore.backendbookstore.entity.Order;
import com.bookstore.backendbookstore.service.OrderService;
import com.bookstore.backendbookstore.service.UserService;
import com.bookstore.backendbookstore.utils.Msg;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.*;
import org.springframework.web.bind.annotation.*;
import com.bookstore.backendbookstore.entity.User;

import java.util.List;

@RestController
@EnableAutoConfiguration
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @GetMapping("/api/order")
    public List<Order> getOrder(HttpSession session) {
        User user = (User) session.getAttribute("user");
        return orderService.getOrders(user.getId());
    }

    @PostMapping("/api/order")
    public Msg placeOrder(@RequestBody JSONObject orderRequest, HttpSession session) {
        User user = (User) session.getAttribute("user");
        Long price = orderRequest.getLong("price");
        if (user.getBalance() < price) {
            return new Msg(false, "余额不足", null);
        }
        userService.updateBalance(user.getId(), price);
        return orderService.addOrder(user.getId(), orderRequest);
    }
}
