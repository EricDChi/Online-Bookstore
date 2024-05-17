package com.bookstore.backendbookstore.dao;

import com.bookstore.backendbookstore.entity.Order;

import java.util.List;

public interface OrderDao {

    List<Order> findByUserId(Long userId);

    void insertOrder(Order order);
}