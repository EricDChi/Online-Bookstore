package com.bookstore.backendbookstore.dao;

import com.bookstore.backendbookstore.entity.Order;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderDao {

    Order findById(Long id);

    List<Order> findByUserId(Long userId);

    List<Order> findByCreateTimeBetween(LocalDateTime startDate, LocalDateTime endDate);

    List<Order> findByUserIdAndCreateTimeBetween(Long userId, LocalDateTime startDate, LocalDateTime endDate);

    List<Order> getPagedOrders(Integer pageIndex, Integer pageSize);

    List<Order> getPagedOrdersByUserId(Long userId, Integer pageIndex, Integer pageSize);

    void save(Order order);

    int count();

    int countByUserId(Long userId);
}