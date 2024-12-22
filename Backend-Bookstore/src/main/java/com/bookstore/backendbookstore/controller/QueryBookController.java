package com.bookstore.backendbookstore.controller;

import com.bookstore.backendbookstore.entity.Book;
import com.bookstore.backendbookstore.service.BookService;
import com.bookstore.backendbookstore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

@Controller
public class QueryBookController {

    private final BookService bookService;

    @Autowired
    public QueryBookController(BookService bookService) {
        this.bookService = bookService;
    }

    @QueryMapping
    public Book bookByTitle(@Argument String title) {
        return bookService.searchBooks(title, 0, 10)
                .getJSONArray("items")
                .getJSONObject(0)
                .toJavaObject(Book.class);
    }
}
