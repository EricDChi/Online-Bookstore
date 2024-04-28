package com.bookstore.backendbookstore.dao;

import com.bookstore.backendbookstore.entity.cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface cartDAO extends JpaRepository<cart, Long>{

}