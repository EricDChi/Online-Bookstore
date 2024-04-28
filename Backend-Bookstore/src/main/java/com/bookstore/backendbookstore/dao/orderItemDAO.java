package com.bookstore.backendbookstore.dao;

import com.bookstore.backendbookstore.entity.orderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface orderItemDAO extends JpaRepository<orderItem, Long>{

}