package com.bookstore.microservice.controller;

import com.bookstore.microservice.service.BookService;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@EnableAutoConfiguration
public class BookController {

    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/api/bookAuthor/{title}")
    public String getBookAuthor(@PathVariable("title") String title) {
        return bookService.getAuthorByTitle(title);
    }

}
