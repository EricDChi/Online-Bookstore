package com.bookstore.microservice.dao;

import com.bookstore.microservice.entity.Book;

public interface BookDao {

    Book findByTitle(String title);
}
