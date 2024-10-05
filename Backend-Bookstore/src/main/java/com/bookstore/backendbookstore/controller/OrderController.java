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
import org.springframework.kafka.core.KafkaTemplate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Month;
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

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @GetMapping("/api/order")
    public JSONObject getOrder(@RequestParam("keyword") String keyword,
                                @RequestParam("pageIndex") Integer pageIndex,
                                @RequestParam("pageSize") Integer pageSize,
                                @RequestParam("startDate") String startDate,
                                @RequestParam("endDate") String endDate,
                                HttpSession session) {
        User user = (User) session.getAttribute("user");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime start = LocalDateTime.of(2000, Month.JANUARY, 1, 0, 0);
        LocalDateTime end = LocalDateTime.of(2100, Month.DECEMBER, 31, 23, 59, 59, 999999999);
        if (!startDate.isEmpty()) {
            start = LocalDateTime.parse(startDate, formatter);
        }
        if (!endDate.isEmpty()) {
            end = LocalDateTime.parse(endDate, formatter);
        }
        if (user.getRole() == 1) {
            return orderService.getPagedOrdersByUserId(0L, keyword, pageIndex, pageSize, start, end);
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
        if (!orderService.judgeOrder(orderRequest)) {
            return new Msg(false, "库存不足", null);
        }
        userService.updateBalance(user.getId(), price);
        return orderService.addOrder(user.getId(), orderRequest);
    }

    @RequestMapping("api/async_order")
    public Msg placeOrder_async(@RequestBody JSONObject orderRequest, HttpSession session) {
        User user = (User) session.getAttribute("user");
        Integer price = orderRequest.getInteger("price");
        if (user.getBalance() < price) {
            return new Msg(false, "余额不足", null);
        }
        if (!orderService.judgeOrder(orderRequest)) {
            return new Msg(false, "库存不足", null);
        }
        orderRequest.put("userId", user.getId());
        kafkaTemplate.send("order", "key", orderRequest.toJSONString());
        userService.updateBalance(user.getId(), price);
        System.out.println(orderRequest.toJSONString());
        return new Msg(true, "下单成功", null);
    }

    @GetMapping("/api/book/analyze")
    public JSONObject analyzeBook(@RequestParam("pageIndex") Integer pageIndex,
                                   @RequestParam("pageSize") Integer pageSize,
                                   @RequestParam("startDate") String startDate,
                                   @RequestParam("endDate") String endDate,
                                   HttpSession session) {
        User user = (User) session.getAttribute("user");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime start = LocalDateTime.of(2000, Month.JANUARY, 1, 0, 0);
        LocalDateTime end = LocalDateTime.of(2100, Month.DECEMBER, 31, 23, 59, 59, 999999999);
        if (!startDate.isEmpty()) {
            start = LocalDateTime.parse(startDate, formatter);
        }
        if (!endDate.isEmpty()) {
            end = LocalDateTime.parse(endDate, formatter);
        }
        return orderService.analyzeOrderByUserId(user.getId(), pageIndex, pageSize,  start, end);
    }

    @GetMapping("/api/book/rank")
    public JSONObject rankBook(@RequestParam("startDate") String startDate,
                               @RequestParam("endDate") String endDate,
                               HttpSession session) {
        User user = (User) session.getAttribute("user");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime start = LocalDateTime.of(LocalDate.now().minusDays(1), LocalTime.MIN);
        LocalDateTime end = LocalDateTime.of(LocalDate.now(), LocalTime.MAX);
        if (!startDate.isEmpty()) {
            start = LocalDateTime.parse(startDate, formatter);
        }
        if (!endDate.isEmpty()) {
            end = LocalDateTime.parse(endDate, formatter);
        }
        if (user != null && user.getRole() == 1) {
            return orderService.rankBooks(start, end);
        }
        return null;
    }

    @GetMapping("/api/user/rank")
    public JSONObject rankUser(@RequestParam("startDate") String startDate,
                               @RequestParam("endDate") String endDate,
                               HttpSession session) {
        User user = (User) session.getAttribute("user");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime start = LocalDateTime.of(LocalDate.now().minusDays(1), LocalTime.MIN);
        LocalDateTime end = LocalDateTime.of(LocalDate.now(), LocalTime.MAX);
        if (!startDate.isEmpty()) {
            start = LocalDateTime.parse(startDate, formatter);
        }
        if (!endDate.isEmpty()) {
            end = LocalDateTime.parse(endDate, formatter);
        }
        if (user != null && user.getRole() == 1) {
            return orderService.rankUsers(start, end);
        }
        return null;
    }
}
