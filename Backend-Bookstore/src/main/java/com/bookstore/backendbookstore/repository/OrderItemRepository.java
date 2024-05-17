package com.bookstore.backendbookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bookstore.backendbookstore.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
