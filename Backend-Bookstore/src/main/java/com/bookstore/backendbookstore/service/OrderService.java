package com.bookstore.backendbookstore.service;

import com.alibaba.fastjson2.JSONObject;
import com.bookstore.backendbookstore.entity.Order;
import com.bookstore.backendbookstore.utils.Msg;

import java.util.List;

public interface OrderService {
    List<Order> getOrders(Long userId);

    JSONObject getPagedOrders(String keyword, Integer pageIndex, Integer pageSize);

    JSONObject getPagedOrdersByUserId(Long userId, String keyword, Integer pageIndex, Integer pageSize);

    Msg addOrder(Long userId, JSONObject orderRequest);

    void addOrderItems(Long userId, Long orderId, Long bookId, Long number, String title, String cover);
}
