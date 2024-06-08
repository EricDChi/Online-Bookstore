package com.bookstore.backendbookstore.controller;

import com.alibaba.fastjson2.JSONObject;
import com.bookstore.backendbookstore.service.OrderService;
import com.bookstore.backendbookstore.service.UserService;
import com.bookstore.backendbookstore.utils.Msg;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.*;
import org.springframework.web.bind.annotation.*;
import com.bookstore.backendbookstore.entity.User;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@EnableAutoConfiguration
public class OrderController {

    private final OrderService orderService;

    private final UserService userService;

    @Autowired
    public OrderController(OrderService orderService, UserService userService) {
        this.orderService = orderService;
        this.userService = userService;
    }

    @GetMapping("/api/order")
    public JSONObject getOrder(@RequestParam("keyword") String keyword,
                                @RequestParam("pageIndex") Integer pageIndex,
                                @RequestParam("pageSize") Integer pageSize,
                                @RequestParam("startDate") String startDate,
                                @RequestParam("endDate") String endDate,
                                HttpSession session) {
        User user = (User) session.getAttribute("user");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime start = LocalDateTime.MIN;
        LocalDateTime end = LocalDateTime.MAX;
        if (!startDate.isEmpty()) {
            start = LocalDateTime.parse(startDate, formatter);
        }
        if (!endDate.isEmpty()) {
            end = LocalDateTime.parse(endDate, formatter);
        }
        if (user.getRole() == 1) {
            return orderService.getPagedOrders(keyword, pageIndex, pageSize, start, end);
        }
        return orderService.getPagedOrdersByUserId(user.getId(), keyword, pageIndex, pageSize, start, end);
    }

    @PostMapping("/api/order")
    public Msg placeOrder(@RequestBody JSONObject orderRequest, HttpSession session) {
        User user = (User) session.getAttribute("user");
        Integer price = orderRequest.getInteger("price");
        if (user.getBalance() < price) {
            return new Msg(false, "余额不足", null);
        }
        userService.updateBalance(user.getId(), price);
        return orderService.addOrder(user.getId(), orderRequest);
    }
}
