package com.bookstore.backendbookstore.dao;

import com.bookstore.backendbookstore.entity.book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface bookDAO extends JpaRepository<book, Long>{

    @Query("select b from book b where b.title like %?1%")
    List<book> findByTitle(String keyword);
}