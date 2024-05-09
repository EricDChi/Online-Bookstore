package com.bookstore.backendbookstore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.*;
import org.springframework.web.bind.annotation.*;
import com.bookstore.backendbookstore.entity.Book;
import com.bookstore.backendbookstore.service.BookService;

import java.util.List;

@RestController
@EnableAutoConfiguration
public class BookController {

    @Autowired
    BookService bookService;

    @GetMapping("/api/book")
    public BookService.BookResponse getBooks() {
        List<Book> items = bookService.getAllBooks();
        int total = items.size() / 10;
        return new BookService.BookResponse(total, items);
    }

    @GetMapping("/api/book/{id}")
    public Book getBookByID(@PathVariable("id") Long id) {
        if (id > 0) {
            return bookService.findBookByID(id);
        }
        return null;
    }

    @GetMapping("api/search")
    public BookService.BookResponse getSearchBooks(@RequestParam("keyword") String keyword,
                                                   @RequestParam("pageIndex") Integer pageIndex,
                                                   @RequestParam("pageSize") Integer pageSize) {
        return bookService.searchBooks(keyword, pageIndex, pageSize);
    }

    @GetMapping("api/books")
    public BookService.BookResponse getSearchedBooks(@RequestParam("pageIndex") Integer pageIndex,
                                                     @RequestParam("pageSize") Integer pageSize) {
        return bookService.getPagedBooks(pageIndex, pageSize);
    }
}
