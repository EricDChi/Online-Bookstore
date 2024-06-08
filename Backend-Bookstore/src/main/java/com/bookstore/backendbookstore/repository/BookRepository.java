package com.bookstore.backendbookstore.repository;

import com.bookstore.backendbookstore.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long>{

    @Query("select b from Book b where b.title like %?1%")
    List<Book> findByTitle(String keyword);

    Book findByIsbn(String isbn);
}
