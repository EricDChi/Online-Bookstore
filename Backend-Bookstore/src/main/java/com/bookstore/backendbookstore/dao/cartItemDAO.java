package com.bookstore.backendbookstore.dao;

import com.bookstore.backendbookstore.entity.cartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface cartItemDAO extends JpaRepository<cartItem, Long>{

}