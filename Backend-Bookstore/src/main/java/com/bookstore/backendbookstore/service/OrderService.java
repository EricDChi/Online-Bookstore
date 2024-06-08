package com.bookstore.backendbookstore.service;

import com.alibaba.fastjson2.JSONObject;
import com.bookstore.backendbookstore.entity.Order;
import com.bookstore.backendbookstore.utils.Msg;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderService {
    List<Order> getOrders(Long userId);

    JSONObject getPagedOrders(String keyword, Integer pageIndex, Integer pageSize, LocalDateTime startDate, LocalDateTime endDate);

    JSONObject getPagedOrdersByUserId(Long userId, String keyword, Integer pageIndex, Integer pageSize, LocalDateTime startDate, LocalDateTime endDate);

    Msg addOrder(Long userId, JSONObject orderRequest);

}
