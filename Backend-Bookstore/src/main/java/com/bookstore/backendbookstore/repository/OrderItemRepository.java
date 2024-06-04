package com.bookstore.backendbookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bookstore.backendbookstore.entity.OrderItem;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    @Query("select b from OrderItem b where b.title like %?1%")
    List<OrderItem> findByTitle(String keyword);
}
