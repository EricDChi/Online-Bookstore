package com.bookstore.backendbookstore.dao;

import com.bookstore.backendbookstore.entity.CartItem;
import com.bookstore.backendbookstore.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDAO extends JpaRepository<Order, Long>{

    List<Order> findByUserId(Long userId);

    default Long insertOrder(Order order) {
        save(order);
        Long id = order.getId();
        return id;
    }
}