package com.bookstore.backendbookstore.dao;

import com.bookstore.backendbookstore.entity.Book;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface BookDAO extends JpaRepository<Book, Long>{

    @Query("select b from Book b where b.title like %?1%")
    List<Book> findByTitle(String keyword);

    @Modifying
    @Query("UPDATE Book c SET c.sales = c.sales + :number WHERE c.id = :id")
    void updateSalesById(@Param("id") Long id, @Param("number") Integer number);
}