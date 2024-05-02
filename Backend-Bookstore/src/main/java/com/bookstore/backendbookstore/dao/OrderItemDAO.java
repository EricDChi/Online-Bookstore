package com.bookstore.backendbookstore.dao;

import com.bookstore.backendbookstore.entity.CartItem;
import com.bookstore.backendbookstore.entity.Order;
import com.bookstore.backendbookstore.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemDAO extends JpaRepository<OrderItem, Long>{

    List<OrderItem> findByOrderId(Long orderId);

    default void insertOrderItem(OrderItem orderItem) {
        save(orderItem);
    }
}