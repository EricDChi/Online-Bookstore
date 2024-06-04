package com.bookstore.backendbookstore.dao;

import com.bookstore.backendbookstore.entity.OrderItem;

import java.util.List;

public interface OrderItemDao {

    List<OrderItem> findByTitle(String keyword);

    void insertOrderItem(OrderItem orderItem);
}