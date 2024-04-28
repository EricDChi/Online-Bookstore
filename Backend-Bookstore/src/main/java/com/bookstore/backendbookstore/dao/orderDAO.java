package com.bookstore.backendbookstore.dao;

import com.bookstore.backendbookstore.entity.order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface orderDAO extends JpaRepository<order, Long>{

}