package com.bookstore.backendbookstore.repository;

import com.bookstore.backendbookstore.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long>{

    @Query("select b from Book b where b.title like %?1%")
    List<Book> findByTitle(String keyword);
}
