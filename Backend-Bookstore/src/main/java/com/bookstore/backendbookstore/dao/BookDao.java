package com.bookstore.backendbookstore.dao;

import com.bookstore.backendbookstore.entity.Book;

import java.util.List;

public interface BookDao {
    List<Book> findByTitle(String keyword);

    List<Book> findAll();

    List<Book> getPagedBooks(Integer pageIndex, Integer pageSize);

    Book findById(Long id);

    Book findByISBN(String ISBN);

    Boolean existsById(Long id);

    int count();

    void updateSalesAndStockById(Long id, Integer number);

    void save(Book book);

    void deleteById(Long id);
}