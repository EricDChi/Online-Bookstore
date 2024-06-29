package com.bookstore.backendbookstore.repository;

import com.bookstore.backendbookstore.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUserId(Long userId);

    List<Order> findByCreateTimeBetween(LocalDateTime startDate, LocalDateTime endDate);

    List<Order> findByUserIdAndCreateTimeBetween(Long userId, LocalDateTime startDate, LocalDateTime endDate);

    int countByUserId(Long userId);
}
