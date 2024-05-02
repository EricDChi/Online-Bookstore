package com.bookstore.backendbookstore.controller;

import com.bookstore.backendbookstore.service.OrderService;
import com.bookstore.backendbookstore.utils.BookItem;
import com.bookstore.backendbookstore.utils.Msg;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.*;
import org.springframework.web.bind.annotation.*;
import com.bookstore.backendbookstore.entity.User;

import java.util.List;
import java.util.Map;

@RestController
@EnableAutoConfiguration
public class OrderController {

    @Autowired
    OrderService orderService;

    @GetMapping("/api/order")
    public List<OrderService.OrderResponse> getOrder(HttpSession session) {
        User user = (User) session.getAttribute("user");
        List<OrderService.OrderResponse> orderResponses = orderService.getOrders(user.getId());
        return orderResponses;
    }

    @PostMapping("/api/order")
    public Msg placeOrder(@RequestBody OrderService.OrderRequest orderRequest, HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user.getBalance() < orderRequest.getPrice()) {
            return new Msg(false, "余额不足", null);
        }
        return orderService.addOrder(user.getId(), orderRequest);
    }
}
