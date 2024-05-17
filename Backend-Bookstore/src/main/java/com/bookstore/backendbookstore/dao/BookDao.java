package com.bookstore.backendbookstore.dao;

import com.bookstore.backendbookstore.entity.Book;

import java.util.List;

public interface BookDao {
    List<Book> findByTitle(String keyword);

    List<Book> findAll();

    List<Book> getPagedBooks(Integer pageIndex, Integer pageSize);

    Book findById(Long id);

    Boolean existsById(Long id);

    int count();

    void updateSalesAndStockById(Long id, Long number);

    void insertBook(Book book);
}